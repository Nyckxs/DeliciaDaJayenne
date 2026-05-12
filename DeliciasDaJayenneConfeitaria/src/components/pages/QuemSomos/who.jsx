import "./who.css";

const VALORES = [
  { icon: "✨", titulo: "Qualidade",    texto: "Ingredientes selecionados e processos artesanais em cada receita." },
  { icon: "❤️", titulo: "Amor",         texto: "Cada bolo carrega o carinho e dedicação de quem faz com paixão." },
  { icon: "🎨", titulo: "Criatividade", texto: "Designs exclusivos que transformam o seu evento em memória." },
  { icon: "🤝", titulo: "Compromisso",  texto: "Pontualidade, honestidade e atenção em cada atendimento." },
];

const TIMELINE = [
  { ano: "2019", titulo: "O início",        texto: "Jayenne começa a fazer doces para amigos e família na própria cozinha." },
  { ano: "2020", titulo: "Primeiros pedidos", texto: "As encomendas crescem e o negócio começa a tomar forma nas redes sociais." },
  { ano: "2022", titulo: "Expansão",        texto: "Nova estrutura, equipe formada e lançamento do delivery próprio." },
  { ano: "2024", titulo: "Hoje",            texto: "Mais de 5 anos adoçando vidas com mais de 500 clientes satisfeitos." },
];

export default function QuemSomos() {
  return (
    <main className="qs-page">

      {/* ── Hero ── */}
      <section className="qs-hero">
        <div className="qs-hero-content">
          <div className="qs-hero-text">
            <span className="qs-badge">🎂 Nossa história</span>
            <h1 className="qs-title">
              Uma paixão transformada<br />em arte doce
            </h1>
            <p className="qs-subtitle">
              Somos uma confeitaria artesanal apaixonada por criar momentos
              inesquecíveis através de sabores únicos e criações exclusivas.
            </p>
          </div>
          <div className="qs-hero-emoji">🎂</div>
        </div>
      </section>

      {/* ── Sobre a Jayenne ── */}
      <section className="qs-section qs-warm">
        <div className="qs-about-grid">
          <div className="qs-img-box">
            <span className="qs-big-emoji">👩‍🍳</span>
            <div className="qs-badge-box">
              <span className="qs-badge-num">5+</span>
              <span className="qs-badge-text">Anos de sabor</span>
            </div>
          </div>

          <div className="qs-about-text">
            <span className="qs-tag">Quem é a Jayenne?</span>
            <h2 className="qs-section-title">Da cozinha de casa<br />para o seu coração</h2>
            <p>
              Tudo começou com uma paixão pela confeitaria e pelo desejo de ver sorrisos nas faces de quem
              prova algo feito com amor. Jayenne sempre soube que a cozinha era o seu lugar — e foi lá que
              nasceu a <strong>Delícias da Jayenne</strong>.
            </p>
            <p>
              Começando com pequenas encomendas para amigos e familiares, a confeitaria cresceu com muito
              trabalho, dedicação e, claro, muito sabor. Hoje, contamos com uma equipe apaixonada e uma
              estrutura que nos permite entregar produtos de alta qualidade para toda Fortaleza.
            </p>
            <p>
              Cada receita é desenvolvida com carinho e ingredientes selecionados, garantindo que cada mordida
              seja uma experiência única. Porque aqui, cozinhar é um ato de amor.
            </p>

            <div className="qs-stats">
              <div className="qs-stat">
                <span className="qs-stat-num">500+</span>
                <span className="qs-stat-label">Clientes felizes</span>
              </div>
              <div className="qs-stat">
                <span className="qs-stat-num">1.200+</span>
                <span className="qs-stat-label">Bolos entregues</span>
              </div>
              <div className="qs-stat">
                <span className="qs-stat-num">5★</span>
                <span className="qs-stat-label">Avaliação média</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nossos valores ── */}
      <section className="qs-section qs-light">
        <p className="qs-sub">O que nos move</p>
        <h2 className="qs-section-title qs-center">Nossos Valores</h2>
        <div className="qs-valores-grid">
          {VALORES.map((v) => (
            <div key={v.titulo} className="qs-valor-card">
              <span className="qs-valor-icon">{v.icon}</span>
              <h3 className="qs-valor-titulo">{v.titulo}</h3>
              <p className="qs-valor-texto">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="qs-section qs-warm">
        <p className="qs-sub">Como chegamos até aqui</p>
        <h2 className="qs-section-title qs-center">Nossa Trajetória</h2>
        <div className="qs-timeline">
          {TIMELINE.map((item, i) => (
            <div key={item.ano} className={`qs-timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
              <div className="qs-timeline-card">
                <span className="qs-timeline-ano">{item.ano}</span>
                <h3 className="qs-timeline-titulo">{item.titulo}</h3>
                <p className="qs-timeline-texto">{item.texto}</p>
              </div>
              <div className="qs-timeline-dot" />
            </div>
          ))}
          <div className="qs-timeline-line" />
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="qs-cta-section">
        <div className="qs-cta-emoji">🍰</div>
        <h2 className="qs-cta-title">Faça parte dessa história</h2>
        <p className="qs-cta-text">
          Cada pedido que você faz é mais um capítulo da nossa jornada.<br />
          Obrigada por confiar na Delícias da Jayenne! ❤️
        </p>
        <div className="qs-cta-buttons">
          <a href="/contato"  className="qs-btn-primary">Entrar em contato</a>
          <a href="https://wa.me/5585999999999" target="_blank" rel="noreferrer" className="qs-btn-whatsapp">
            💬 WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
}