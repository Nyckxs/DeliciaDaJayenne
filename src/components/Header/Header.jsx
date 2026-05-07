import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import djLogo from "../../assets/dj.svg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Kit festa", href: "/kit-festa" },
  { label: "Delivery", href: "/delivery" },
  { label: "Contato", href: "/contato" },
];

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const navigate = useNavigate();

  const handleNavClick = (label) => {
    setActivePage(label);
    setMenuOpen(false);
  };

  return (
    <header className="header-wrapper">
      {/* ── Top bar ── */}
      <div className="header-topbar">
        <span>
          Faça seu <strong>pedido online</strong>
        </span>
      </div>

      {/* ── Main header ── */}
      <div className="header-main">
        {/* Logo */}
        <Link to="/" className="header-logo" aria-label="Delícias da Jayenne – página inicial">
          <img src={djLogo} alt="Delícias da Jayenne" />
        </Link>

        {/* Nav pill (desktop) */}
        <div className="header-nav-pill">
          <nav aria-label="Menu principal">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className={`nav-link${activePage === label ? " active" : ""}`}
                onClick={() => handleNavClick(label)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button className="header-search-btn" aria-label="Pesquisar">
            <SearchIcon />
          </button>
        </div>

        {/* Auth buttons (desktop) */}
        <div className="header-auth">
          <button className="btn-auth btn-cadastrar" onClick={() => navigate("/register")}>
            Cadastrar-se
          </button>
          <button className="btn-auth btn-entrar" onClick={() => navigate("/login")}>
            Entrar
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="mobile-nav-link"
            onClick={() => handleNavClick(label)}
          >
            {label}
          </Link>
        ))}

        <div className="mobile-auth">
          <button
            className="btn-auth btn-cadastrar"
            onClick={() => { navigate("/register"); setMenuOpen(false); }}
          >
            Cadastrar-se
          </button>
          <button
            className="btn-auth btn-entrar"
            onClick={() => { navigate("/login"); setMenuOpen(false); }}
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;