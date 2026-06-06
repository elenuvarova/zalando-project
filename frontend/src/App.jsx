import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Look from "./pages/Look.jsx";
import Discover from "./pages/Discover.jsx";
import Analytics from "./pages/Analytics.jsx";

const CASE_STUDY = "https://github.com/elenuvarova/zalando-project/blob/main/writing/case-study.md";

function ConceptRibbon() {
  return (
    <div className="concept-ribbon">
      <strong>Concept redesign</strong> of Zalando's outfit-discovery surfaces · portfolio work by Elena Uvarova · not
      affiliated with Zalando · <a href={CASE_STUDY} target="_blank" rel="noopener noreferrer">read the case study ↗</a>
    </div>
  );
}

function Header() {
  return (
    <header className="hdr">
      <div className="hdr-main">
        <Link to="/" className="logo" aria-label="Home">zalando<span className="dot">.</span></Link>
        <div className="hdr-search">
          <input type="search" placeholder="Search for items and brands" aria-label="Search" />
        </div>
        <nav className="hdr-icons" aria-label="Account">
          <a href="#account" onClick={(e) => e.preventDefault()}>◌ Account</a>
          <a href="#wishlist" onClick={(e) => e.preventDefault()}>♡ Wishlist</a>
          <a href="#bag" onClick={(e) => e.preventDefault()}>▢ Bag</a>
        </nav>
      </div>
      <div className="hdr-nav">
        <div className="wrap">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/discover">Discover by style</NavLink>
          <NavLink to="/analytics">The data</NavLink>
          <a className="demo" href={CASE_STUDY} target="_blank" rel="noopener noreferrer">Case study ↗</a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-cols">
          <div>
            <h4>The redesign</h4>
            <Link to="/shop">Shop (redesigned PDP)</Link>
            <Link to="/discover">Discover by style cluster</Link>
            <Link to="/analytics">The data behind it</Link>
          </div>
          <div>
            <h4>Project</h4>
            <a href={CASE_STUDY} target="_blank" rel="noopener noreferrer">Full case study</a>
            <a href="https://github.com/elenuvarova/zalando-project" target="_blank" rel="noopener noreferrer">Source on GitHub</a>
          </div>
          <div>
            <h4>What's real</h4>
            <span style={{ color: "var(--ink-3)", fontSize: "0.86rem" }}>Product names, colours &amp; outfit recommendations are derived from the H&amp;M Kaggle dataset (a proxy).</span>
          </div>
        </div>
        <p className="ftr-disclaim">
          <b>Disclaimer.</b> This is an independent <b>concept redesign</b> and portfolio case study by Elena Uvarova. It is
          <b> not affiliated with, endorsed by, or connected to Zalando SE</b>. The "zalando" name and look are referenced only
          to demonstrate UX improvements to publicly observable surfaces. Product imagery is illustrative placeholder art;
          prices, brands and creator/provenance labels are synthesised. Product attributes and the outfit-recommendation logic
          are derived from the public H&amp;M Personalized Fashion Recommendations dataset (Kaggle) used as a proxy.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ConceptRibbon />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product/:id" element={<Product />} />
          <Route path="/shop/look/:id" element={<Look />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
