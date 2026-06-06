import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import GithubSlugger from "github-slugger";

// Lazy-loaded: the force-graph + d3 dependency is the heaviest in the bundle and is only
// needed once the reader scrolls to the data section.
const StyleClustersGraph = lazy(() => import("./StyleClustersGraph.jsx"));

const GITHUB_TREE = "https://github.com/elenuvarova/zalando-project/tree/main";
const GITHUB_RAW = "https://raw.githubusercontent.com/elenuvarova/zalando-project/main";

const REHYPE_PLUGINS = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: { className: ["anchor"], "aria-label": "Link to this section" },
      content: { type: "text", value: "#" },
    },
  ],
];

// Rewrite relative repo links to GitHub, then run react-markdown's own sanitizer so
// unsafe protocols (javascript:, data:) are still stripped — composing, not replacing it.
function rewriteLink(href) {
  if (!href) return href;
  if (href.startsWith("../")) return defaultUrlTransform(`${GITHUB_TREE}/${href.slice(3)}`);
  if (href.startsWith("./")) return defaultUrlTransform(`${GITHUB_TREE}/${href.slice(2)}`);
  return defaultUrlTransform(href);
}

function rewriteImage(src) {
  if (!src) return src;
  if (src.endsWith("style-clusters-preview.png")) return "/style-clusters-preview.png";
  if (src.startsWith("../")) return defaultUrlTransform(`${GITHUB_RAW}/${src.slice(3)}`);
  if (src.startsWith("./")) return defaultUrlTransform(`${GITHUB_RAW}/${src.slice(2)}`);
  return defaultUrlTransform(src);
}

// Pull h2 headings out of the markdown for the table of contents. Slugs are generated
// with the same github-slugger rehype-slug uses, so the anchors line up exactly.
function extractToc(md) {
  const slugger = new GithubSlugger();
  const toc = [];
  for (const line of md.split("\n")) {
    const m = /^(##) +(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
    toc.push({ id: slugger.slug(text), text });
  }
  return toc;
}

function readingTime(md) {
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

// Scroll-spy: highlight the section currently in view.
function useActiveHeading(ready, ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!ready || ids.length === 0) return;
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (headings.length === 0) return;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const firstVisible = ids.find((id) => visible.has(id));
        if (firstVisible) setActive(firstVisible);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [ready, ids]);
  return active;
}

function Toc({ items, active }) {
  if (items.length === 0) return null;
  const links = items.map((it) => (
    <li key={it.id}>
      <a href={`#${it.id}`} className={active === it.id ? "active" : undefined}>
        {it.text}
      </a>
    </li>
  ));
  return (
    <>
      <nav className="toc" aria-label="Table of contents">
        <div className="toc-title">On this page</div>
        <ul>{links}</ul>
      </nav>
      <details className="toc-mobile">
        <summary>On this page</summary>
        <ul>{links}</ul>
      </details>
    </>
  );
}

export default function App() {
  const [markdown, setMarkdown] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState(null);
  const [theme, toggleTheme] = useTheme();
  const progress = useReadingProgress();

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/case-study.md", { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        setMarkdown(text);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErrorMsg(err.message);
        setStatus("error");
      });
    return () => ctrl.abort();
  }, []);

  const toc = useMemo(() => (markdown ? extractToc(markdown) : []), [markdown]);
  const tocIds = useMemo(() => toc.map((t) => t.id), [toc]);
  const minutes = useMemo(() => (markdown ? readingTime(markdown) : 0), [markdown]);
  const active = useActiveHeading(status === "ready", tocIds);

  const components = useMemo(
    () => ({
      // Unwrap paragraphs that contain only a block image, so the swapped-in graph
      // (a <div>) isn't nested inside a <p> (invalid HTML).
      p: ({ node, children, ...props }) => {
        const only = node?.children?.length === 1 ? node.children[0] : null;
        if (only && only.tagName === "img") return <>{children}</>;
        return <p {...props}>{children}</p>;
      },
      table: ({ node, ...props }) => (
        <div
          className="table-scroll"
          role="region"
          aria-label="Data table — scroll horizontally to see all columns"
          tabIndex={0}
        >
          <table {...props} />
        </div>
      ),
      img: ({ src, alt, ...rest }) => {
        // Swap the static force-graph PNG for the live interactive component.
        if (src && src.includes("style-clusters-preview.png")) {
          return (
            <Suspense
              fallback={
                <div className="graph-card">
                  <p className="muted">Loading interactive graph…</p>
                </div>
              }
            >
              <StyleClustersGraph />
            </Suspense>
          );
        }
        return <img src={rewriteImage(src)} alt={alt} loading="lazy" {...rest} />;
      },
      a: ({ href, children, className, ...rest }) => {
        const finalHref = rewriteLink(href);
        const external = finalHref && /^https?:/i.test(finalHref);
        return (
          <a
            href={finalHref}
            className={className}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            {...rest}
          >
            {children}
          </a>
        );
      },
    }),
    []
  );

  return (
    <>
      <a className="skip-link" href="#case-study">Skip to content</a>
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header className="doc-header">
        <span className="doc-kicker">
          <strong>UX Case Study</strong>
          {status === "ready" && <> · ≈ {minutes} min read</>}
        </span>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
      </header>

      <Toc items={toc} active={active} />

      <main className="prose" id="case-study">
        {status === "loading" && <p className="muted">Loading case study…</p>}

        {status === "error" && (
          <article>
            <h1>Case study failed to load</h1>
            <p className="error">Error: {errorMsg}</p>
            <p>
              The canonical version lives in the repo at{" "}
              <a href={`${GITHUB_TREE}/writing/case-study.md`}>writing/case-study.md</a>.
            </p>
          </article>
        )}

        {status === "ready" && (
          <article>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={REHYPE_PLUGINS}
              components={components}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        )}

        <footer className="footer">
          <p className="muted">
            Source repo:{" "}
            <a href={GITHUB_TREE} target="_blank" rel="noopener noreferrer">
              github.com/elenuvarova/zalando-project
            </a>
            {" · "}
            <a href={`${GITHUB_TREE}/writing/case-study.md`} target="_blank" rel="noopener noreferrer">
              view raw markdown
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
