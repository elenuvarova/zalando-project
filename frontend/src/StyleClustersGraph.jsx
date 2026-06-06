import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function StyleClustersGraph({ onNodeSelect } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? Math.min(900, window.innerWidth - 48) : 740
  );
  const containerRef = useRef(null);
  const fgRef = useRef(null);

  // Height tracks width but stays within a comfortable band on phones and desktop.
  const height = Math.round(Math.min(560, Math.max(380, width * 0.62)));

  useEffect(() => {
    fetch("/style-clusters.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (
          !json ||
          !Array.isArray(json.nodes) ||
          !Array.isArray(json.links) ||
          !Array.isArray(json.communities)
        ) {
          throw new Error("unexpected graph data shape");
        }
        setData(json);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 740;
      setWidth(Math.max(280, Math.floor(w)));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const neighbours = useMemo(() => {
    if (!data) return new Map();
    const m = new Map();
    for (const link of data.links) {
      const s = typeof link.source === "object" ? link.source.id : link.source;
      const t = typeof link.target === "object" ? link.target.id : link.target;
      if (!m.has(s)) m.set(s, new Set());
      if (!m.has(t)) m.set(t, new Set());
      m.get(s).add(t);
      m.get(t).add(s);
    }
    return m;
  }, [data]);

  const summary = useMemo(() => {
    if (!data) return "";
    const names = data.communities.map((c) => `#${c.id} ${c.label}`).join(", ");
    return `Force-directed graph of ${data.nodes.length} SKUs and ${data.links.length} co-purchase edges, grouped into ${data.communities.length} style communities by Louvain clustering of H&M transaction data. Communities shown: ${names}.`;
  }, [data]);

  const focusId = selectedNode?.id ?? hoverNode?.id ?? null;
  const focusNeighbours = focusId ? neighbours.get(focusId) : null;

  if (error) {
    return (
      <div className="graph-card">
        <p className="error">Could not load the interactive graph: {error}.</p>
        <p className="muted">
          Static preview:{" "}
          <a href="/style-clusters-preview.png">style-clusters-preview.png</a>
        </p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="graph-card">
        <p className="muted">Loading interactive graph…</p>
      </div>
    );
  }

  const isDim = (n) => {
    if (!focusId) return false;
    if (n.id === focusId) return false;
    if (focusNeighbours && focusNeighbours.has(n.id)) return false;
    return true;
  };
  const isLinkActive = (l) => {
    if (!focusId) return true;
    const s = typeof l.source === "object" ? l.source.id : l.source;
    const t = typeof l.target === "object" ? l.target.id : l.target;
    return s === focusId || t === focusId;
  };

  return (
    <div className="graph-card" ref={containerRef}>
      <div className="graph-header">
        <strong>Style clusters · interactive</strong>
        <span className="muted">
          {data.nodes.length} SKUs · {data.links.length} edges · {data.communities.length} communities
        </span>
      </div>
      <div
        className="graph-canvas-wrap"
        style={{ height, background: "#11141a" }}
        role="img"
        aria-label={summary}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={width}
          height={height}
          backgroundColor="#11141a"
          cooldownTicks={prefersReducedMotion ? 0 : 120}
          warmupTicks={prefersReducedMotion ? 200 : 0}
          enableNodeDrag={!prefersReducedMotion}
          d3VelocityDecay={0.3}
          linkColor={(l) => (isLinkActive(l) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)")}
          linkWidth={(l) => Math.min(2.2, 0.3 + Math.log(1 + (l.weight ?? 1)) * 0.35)}
          nodeRelSize={5}
          nodeVal={(n) => Math.max(0.5, Math.log(1 + (n.size ?? 1)))}
          nodeColor={(n) => (isDim(n) ? "rgba(120,120,130,0.18)" : n.colour || "#7cb7ff")}
          nodeLabel={(n) => `${n.label}\nCommunity ${n.community} · ${n.garment_group ?? ""}`}
          nodeCanvasObjectMode={(n) => (n.id === focusId ? "after" : undefined)}
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (node.id !== focusId) return;
            const baseRadius = Math.sqrt(Math.max(1, Math.log(1 + (node.size ?? 1)))) * 5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, baseRadius + 2, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2 / globalScale;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
          }}
          onNodeHover={(n) => setHoverNode(n)}
          onNodeClick={(n) => {
            if (onNodeSelect) { onNodeSelect(n.id); return; }
            setSelectedNode((prev) => (prev?.id === n.id ? null : n));
            fgRef.current?.centerAt(n.x, n.y, 600);
            fgRef.current?.zoom(2.6, 600);
          }}
          onBackgroundClick={() => setSelectedNode(null)}
        />
      </div>
      <div className="graph-legend">
        {data.communities.map((c) => (
          <span
            key={c.id}
            className="legend-pill"
            title={`Modal colour: ${c.modal_colour} (uninformative here — H&M catalog is Black-dominated)`}
          >
            <span className="legend-swatch" style={{ background: c.colour }} />
            <span className="legend-label">
              <strong>#{c.id}</strong> {c.label}
            </span>
          </span>
        ))}
      </div>
      <p className="graph-help muted">
        Drag nodes · scroll to zoom · hover for label · {onNodeSelect ? "click a node to open the item" : "click to focus a node and its neighbours · click background to reset"}.
      </p>
    </div>
  );
}
