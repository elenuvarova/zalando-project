import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const CARD_HEIGHT = 560;

export default function StyleClustersGraph() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [width, setWidth] = useState(740);
  const containerRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    fetch("/style-clusters.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  // Responsive width — fit container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 740;
      setWidth(Math.max(280, Math.floor(w)));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Neighbour map for highlighting
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
      <div className="graph-canvas-wrap" style={{ height: CARD_HEIGHT }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={width}
          height={CARD_HEIGHT}
          backgroundColor="#11141a"
          cooldownTicks={120}
          d3VelocityDecay={0.3}
          linkColor={(l) => (isLinkActive(l) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)")}
          linkWidth={(l) => Math.min(2.2, 0.3 + Math.log(1 + (l.weight ?? 1)) * 0.35)}
          nodeRelSize={5}
          nodeVal={(n) => Math.max(0.5, Math.log(1 + (n.size ?? 1)))}
          nodeColor={(n) =>
            isDim(n) ? "rgba(120,120,130,0.18)" : (n.colour || "#7cb7ff")
          }
          nodeLabel={(n) =>
            `${n.label}\nCommunity ${n.community} · ${n.garment_group ?? ""}`
          }
          nodeCanvasObjectMode={(n) => (n.id === focusId ? "after" : undefined)}
          nodeCanvasObject={(node, ctx, globalScale) => {
            // Only draw highlight ring on the focused node — community colours
            // come from the library default via nodeColor above.
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
            setSelectedNode((prev) => (prev?.id === n.id ? null : n));
            fgRef.current?.centerAt(n.x, n.y, 600);
            fgRef.current?.zoom(2.6, 600);
          }}
          onBackgroundClick={() => setSelectedNode(null)}
        />
      </div>
      <div className="graph-legend">
        {data.communities.map((c) => (
          <span key={c.id} className="legend-pill" title={`Modal colour: ${c.modal_colour} (uninformative here — H&M catalog is Black-dominated)`}>
            <span className="legend-swatch" style={{ background: c.colour }} />
            <span className="legend-label">
              <strong>#{c.id}</strong> {c.label}
            </span>
          </span>
        ))}
      </div>
      <p className="graph-help muted">
        Drag nodes · scroll to zoom · hover for label · click to focus a node and its neighbours · click background to reset.
      </p>
      {hoverNode && (
        <div className="graph-tooltip">
          <strong>{hoverNode.label}</strong>
          <br />
          <span className="muted">Community {hoverNode.community} · {hoverNode.garment_group}</span>
        </div>
      )}
    </div>
  );
}
