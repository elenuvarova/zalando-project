import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StyleClustersGraph from "./StyleClustersGraph.jsx";

const GITHUB_TREE = "https://github.com/elenuvarova/zalando-project/tree/main";
const GITHUB_RAW = "https://raw.githubusercontent.com/elenuvarova/zalando-project/main";

// Rewrite relative `../path` links from the source markdown to point at GitHub
// (since the deployed site doesn't serve the research/data/design source tree).
function rewriteLink(href) {
  if (!href) return href;
  if (href.startsWith("../")) return `${GITHUB_TREE}/${href.slice(3)}`;
  if (href.startsWith("./")) return `${GITHUB_TREE}/${href.slice(2)}`;
  return href;
}

function rewriteImage(src) {
  if (!src) return src;
  // The preview PNG is shipped locally; everything else falls back to raw.githubusercontent
  if (src.endsWith("style-clusters-preview.png")) return "/style-clusters-preview.png";
  if (src.startsWith("../")) return `${GITHUB_RAW}/${src.slice(3)}`;
  if (src.startsWith("./")) return `${GITHUB_RAW}/${src.slice(2)}`;
  return src;
}

export default function App() {
  const [markdown, setMarkdown] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/case-study.md")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(setMarkdown)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <main className="prose">
        <h1>Case study failed to load</h1>
        <p className="error">Error: {error}</p>
        <p>
          The canonical version lives in the repo at{" "}
          <a href={`${GITHUB_TREE}/writing/case-study.md`}>writing/case-study.md</a>.
        </p>
      </main>
    );
  }

  if (!markdown) {
    return (
      <main className="prose">
        <p className="muted">Loading case study…</p>
      </main>
    );
  }

  return (
    <main className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={rewriteLink}
        components={{
          img: ({ src, alt, ...rest }) => {
            // Swap the static force-graph PNG for the interactive React component.
            // GitHub raw markdown still renders the PNG; the deployed app gets the live version.
            if (src && src.includes("style-clusters-preview.png")) {
              return <StyleClustersGraph />;
            }
            return <img src={rewriteImage(src)} alt={alt} {...rest} />;
          },
          a: ({ href, children, ...rest }) => (
            <a
              href={rewriteLink(href)}
              target={href && href.startsWith("http") ? "_blank" : undefined}
              rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
              {...rest}
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
      <footer className="footer">
        <p className="muted">
          Source repo: <a href={GITHUB_TREE} target="_blank" rel="noopener noreferrer">github.com/elenuvarova/zalando-project</a>
          {" · "}
          <a href={`${GITHUB_TREE}/writing/case-study.md`} target="_blank" rel="noopener noreferrer">view raw markdown</a>
        </p>
      </footer>
    </main>
  );
}
