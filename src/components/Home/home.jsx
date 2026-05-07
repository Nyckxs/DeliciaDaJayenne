import { useState, useEffect, useRef } from "react";
import "./home.css";

const HERO_SLIDES = [
  {
    id: 1,
    bg: "linear-gradient(135deg, #3b1a08 0%, #7c3a12 50%, #5c2a0e 100%)",
    badge: "🎂 Especial do Mês",
    title: "Bolo de Chocolate\nArtesanal",
    subtitle: "Feito com cacau selecionado e muito amor",
    cta: "Peça o seu",
    emoji: "🍫",
    accent: "#d4813a",
  },
  {
    id: 2,
    bg: "linear-gradient(135deg, #1a0a2e 0%, #4a1a6e 50%, #2e0e50 100%)",
    badge: "🍰 Kit Festa",
    title: "Kits Completos\npara sua Festa",
    subtitle: "Doces, bolos e muito mais para o seu evento",
    cta: "Ver kits",
    emoji: "🎉",
    accent: "#b47ed4",
  },
  {
    id: 3,
    bg: "linear-gradient(135deg, #0a2e1a 0%, #1a6e3a 50%, #0e4a28 100%)",
    badge: "🚚 Delivery",
    title: "Entrega Fresquinha\nna Sua Porta",
    subtitle: "Pedidos até 12h entregues no mesmo dia",
    cta: "Fazer pedido",
    emoji: "🛵",
    accent: "#4ed4a0",
  },
  {
    id: 4,
    bg: "linear-gradient(135deg, #2e1a0a 0%, #8a4a1a 50%, #5c3010 100%)",
    badge: "✨ Novidade",
    title: "Mil Folhas\nTradicional",
    subtitle: "Crocante por fora, cremoso por dentro",
    cta: "Experimentar",
    emoji: "🥐",
    accent: "#e8c47a",
  },
];

const PRODUCTS = [
  { id: 1, name: "Bolo de Chocolate",    price: "R$ 89,90",  badge: "Mais Vendido", emoji: "🍫", category: "Bolos"  },
  { id: 2, name: "Kit Festa Completo",   price: "R$ 249,90", badge: "Promoção",     emoji: "🎂", category: "Kits"   },
  { id: 3, name: "Mil Folhas",           price: "R$ 39,90",  badge: "Novidade",     emoji: "🥐", category: "Tortas" },
  { id: 4, name: "Trufa Sortida (12un)", price: "R$ 49,90",  badge: null,           emoji: "🍬", category: "Doces"  },
  { id: 5, name: "Cesta Café da Manhã", price: "R$ 129,90", badge: "Top",          emoji: "☕", category: "Cestas" },
  { id: 6, name: "Bolo Red Velvet",      price: "R$ 99,90",  badge: null,           emoji: "❤️", category: "Bolos"  },
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

const CATEGORIES = ["Todos", "Bolos", "Kits", "Tortas", "Doces", "Cestas"];

export default function Home() {
  const [currentSlide, setCurrentSlide]     = useState(0);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [cartCount, setCartCount]           = useState(0);
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
  }, [currentSlide]);          // restart timer when slide changes

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
                <span className="product-emoji">{p.emoji}</span>
              </div>
              <div className="product-info">
                <div className="product-cat">{p.category}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-bottom">
                  <span className="product-price">{p.price}</span>
                  <button className="btn-add" onClick={() => setCartCount((c) => c + 1)}>
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
            <div className="about-emoji-placeholder">🎂</div>
            <div className="about-img-overlay">
              <div className="about-overlay-num">5+</div>
              <div className="about-overlay-text">Anos de Sabor</div>
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

            <button className="btn-pedido">Conheça nossa história →</button>
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
          <button className="btn-whatsapp">💬 (85) 99999-9999</button>
          <button className="btn-outline-white">Ver área de entrega</button>
        </div>
      </section>
    </main>
  );
}