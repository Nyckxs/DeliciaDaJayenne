import { useState, useEffect, useRef } from "react";
import "./home.css";
import Amostra from "../../assets/Amostra.svg";
import Amostra2 from "../../assets/Amostra2.png";
import Brownie from "../../assets/Brownie.png";
import BoloMorango from "../../assets/BoloDeMorango.jpeg";
import BoloChocolate from "../../assets/BoloDeChocolate.jpeg";
import BoloConfeitado from "../../assets/BoloConfeitado.jpg";


const HERO_SLIDES = [
  {
    id: 1,
    bg: `url(${Amostra}) no-repeat center/cover`,
    title: "Bolo de Chocolate\nArtesanal",
    subtitle: "Feito com cacau selecionado e muito amor",
    cta: "Peça o seu",
    accent: "#d4813a",
  },
  {
    id: 2,
    bg: `url(${Amostra2}) no-repeat center/cover`,
    title: "Brownies para melhorar seu dia!",
    subtitle: "Feito com cacau selecionado e muito amor",
    cta: "Peça o seu",
    accent: "#b47ed4",
  },
];

const PRODUCTS = [
  { id: 1, name: "Bolo de Chocolate",    price: 79.90,  badge: "Mais Vendido",  category: "Bolos",    image: BoloChocolate },
  { id: 2, name: "Bolo de Morango",      price: 59.90, badge: "Promoção",     category: "Bolos",    image: BoloMorango },
  { id: 3, name: "Brownie de Cacau",     price: 19.90,  badge: "Novidade",     category: "Brownies", image: Brownie },
];

const DELIVERY_FEATURES = [
  { icon: "❄️", title: "Entrega Refrigerada", text: "Produtos sempre frescos"  },
  { icon: "🚗", title: "Entregadores de Carro", text: "Segurança garantida"    },
  { icon: "📅", title: "Envio Agendado",       text: "Escolha o melhor dia"    },
  { icon: "⚡", title: "Mesmo dia",            text: "Pedidos até as 12h"      },
];

const ABOUT_FEATURES = [
  { icon: "✨", title: "Ingredientes Premium", text: "Selecionados com cuidado" },
  { icon: "🎨", title: "Decoração Exclusiva",  text: "Cada bolo é único"        },
  { icon: "🚚", title: "Delivery Fresquinho",  text: "Na sua porta com segurança"},
  { icon: "❤️", title: "Feito com Amor",       text: "Em cada detalhe"          },
];

const CATEGORIES = ["Todos", "Bolos", "Brownies"];

export default function Home({ onAddToCart }) {
  const [currentSlide, setCurrentSlide]     = useState(0);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const intervalRef = useRef(null);

  /* ── Slide helpers ── */
  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () =>
    goToSlide((currentSlide + 1) % HERO_SLIDES.length);

  const prevSlide = () =>
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const startAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);

  const handleArrow = (dir) => {
    clearInterval(intervalRef.current);
    dir === "next" ? nextSlide() : prevSlide();
    startAutoplay();
  };

  const handleDot = (i) => {
    clearInterval(intervalRef.current);
    goToSlide(i);
    startAutoplay();
  };

  const slide = HERO_SLIDES[currentSlide];

  /* ── Filtered products ── */
  const filtered = PRODUCTS.filter(
    (p) => activeCategory === "Todos" || p.category === activeCategory
  );

  return (
    <main>
      {/* ════════════════ HERO ════════════════ */}
      <section className="hero" style={{ background: slide.bg }}>
        <div
          className="hero-content"
          style={{ opacity: isAnimating ? 0.5 : 1, transition: "opacity 0.4s ease" }}
        >
          <div className="hero-text">
            <span className="hero-badge">{slide.badge}</span>
            <h1 className="hero-title">
              {slide.title.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <button className="hero-cta" style={{ color: slide.accent }}>
              {slide.cta} →
            </button>
          </div>

          <div className="hero-image-area">
            <div className="hero-emoji-box">{slide.emoji}</div>
          </div>
        </div>

        <button className="hero-arrow left"  onClick={() => handleArrow("prev")}>‹</button>
        <button className="hero-arrow right" onClick={() => handleArrow("next")}>›</button>

        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === currentSlide ? " active" : ""}`}
              onClick={() => handleDot(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ════════════════ PRODUTOS ════════════════ */}
      <section className="section section-warm">
        <p className="section-sub">Feito com amor e ingredientes selecionados</p>
        <h2 className="section-title">Nossos Destaques</h2>

        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img-area">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <img src={p.image} alt={p.name} />
              </div>
              <div className="product-info">
                <div className="product-cat">{p.category}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-bottom">
                  <span className="product-price">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button className="btn-add" onClick={() => onAddToCart(p)}>
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="btn-pedido">Ver todos os produtos →</button>
        </div>
      </section>

      {/* ════════════════ SOBRE ════════════════ */}
      <section className="section section-light">
        <div className="about-grid">
          <div className="about-img-container">
            <div className="about-emoji-placeholder">
              <img src={BoloConfeitado} alt="Bolo Confeitado" />
            </div>
            <div className="about-img-overlay">
        
            </div>
          </div>

          <div className="about-content">
            <span className="about-tag">Quem somos</span>
            <h2 className="section-title">
              Uma paixão transformada<br />em arte doce
            </h2>
            <p className="about-text">
              A Delícias da Jayenne é uma confeitaria apaixonada por transformar momentos simples em
              experiências inesquecíveis. Especializada em bolos, doces e sobremesas artesanais, cada
              criação é feita com carinho, ingredientes de qualidade e um toque especial de criatividade.
            </p>
            <p className="about-text">
              Seja para comemorar datas importantes ou adoçar o seu dia, a Delícias da Jayenne traz
              sabor, beleza e muito amor em cada detalhe.
            </p>

            <div className="about-features">
              {ABOUT_FEATURES.map((f) => (
                <div key={f.title} className="feature-item">
                  <span className="feature-icon">{f.icon}</span>
                  <div className="feature-text">
                    <span className="feature-title">{f.title}</span>
                    <span>{f.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-pedido">
              <a href="/contato"  className="qs-btn-primar">Entrar em contato</a>
              </button>
          </div>
        </div>
      </section>

      {/* ════════════════ DELIVERY ════════════════ */}
      <section className="delivery-section">
        <div className="delivery-info">
          <p className="section-sub">Não sai de casa?</p>
          <h2 className="section-title section-title-dark">Delivery para toda a região</h2>
          <p className="delivery-desc">
            Receba nossos produtos fresquinhos na sua porta. Entregas refrigeradas com total segurança e cuidado.
          </p>
          <div className="delivery-features">
            {DELIVERY_FEATURES.map((f) => (
              <div key={f.title} className="delivery-feat">
                <span className="delivery-feat-icon">{f.icon}</span>
                <div>
                  <div className="delivery-feat-title">{f.title}</div>
                  <div className="delivery-feat-text">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="delivery-cta-box">
          <div className="delivery-cta-emoji">🛵</div>
          <h3 className="delivery-cta-title">Peça pelo WhatsApp</h3>
          <p className="delivery-price-note">
            Pedidos feitos até 12h entregues no mesmo dia.<br />
            Após este horário, prazo de até 1 dia útil.
          </p>
          <button className="btn-whatsapp">
            <a href="https://wa.me/5585999999999" target="_blank" rel="noreferrer"  >
               (85) 99999-9999
            </a>
          </button>
          <button className="btn-outline-white">Ver área de entrega</button>
        </div>
      </section>
    </main>
  );
}