import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Look from "./pages/Look.jsx";
import Discover from "./pages/Discover.jsx";
import Analytics from "./pages/Analytics.jsx";
import { CASE_STUDY, REPO } from "./api.js";

function ConceptRibbon() {
  return (
    <div className="concept-ribbon">
      <span><strong>Concept redesign</strong> · independent portfolio work by Elena Uvarova · not affiliated with Zalando</span>
      <a href={CASE_STUDY} target="_blank" rel="noopener noreferrer">Read the case study&nbsp;↗</a>
    </div>
  );
}

function Header() {
  return (
    <header className="hdr">
      <div className="hdr-main">
        <Link to="/" className="logo" aria-label="Home">zalando</Link>
        <div className="hdr-search">
          <span className="hdr-search-ico" aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search for items and brands" aria-label="Search" />
        </div>
        <nav className="hdr-icons" aria-label="Account">
          <a href="#account" onClick={(e) => e.preventDefault()}><span className="hi-ico">⛒</span>Hello</a>
          <a href="#wishlist" onClick={(e) => e.preventDefault()}><span className="hi-ico">♡</span>Wishlist</a>
          <a href="#bag" onClick={(e) => e.preventDefault()}><span className="hi-ico">🛍</span>Bag</a>
        </nav>
      </div>
      <nav className="hdr-cats" aria-label="Categories">
        <div className="wrap">
          <Link to="/shop" className="cat active">Women</Link>
          <Link to="/shop" className="cat">Men</Link>
          <Link to="/shop" className="cat">Kids</Link>
          <Link to="/shop" className="cat sale">Sale</Link>
        </div>
      </nav>
      <nav className="hdr-sub" aria-label="Main">
        <div className="wrap">
          <Link to="/shop" className="sub-cat">New in</Link>
          <Link to="/shop" className="sub-cat">Clothing</Link>
          <Link to="/shop" className="sub-cat">Shoes</Link>
          <Link to="/shop" className="sub-cat">Sportswear</Link>
          <Link to="/shop" className="sub-cat">Accessories</Link>
          <Link to="/shop" className="sub-cat">Brands</Link>
          <span className="sub-spacer" aria-hidden="true" />
          <NavLink to="/discover" className={({ isActive }) => `sub-cat app${isActive ? " on" : ""}`}>Discover by style</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `sub-cat app${isActive ? " on" : ""}`}>The data</NavLink>
          <a className="sub-cat app demo" href={CASE_STUDY} target="_blank" rel="noopener noreferrer">Case study ↗</a>
        </div>
      </nav>
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
            <Link to="/shop">Shop the redesign</Link>
            <Link to="/discover">Discover by style</Link>
            <Link to="/analytics">The data &amp; graphs</Link>
          </div>
          <div>
            <h4>Project</h4>
            <a href={CASE_STUDY} target="_blank" rel="noopener noreferrer">Full case study (Notion)</a>
            <a href={REPO} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
          </div>
          <div>
            <h4>What's real</h4>
            <span className="ftr-note">Product names, colours &amp; outfit recommendations are derived from the H&amp;M Kaggle dataset (used as a proxy). Imagery, prices &amp; brands are illustrative.</span>
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
