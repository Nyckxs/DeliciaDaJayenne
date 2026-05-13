import { useState } from "react";
import "./contact.css";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", assunto: "", mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você conecta ao backend / WhatsApp / EmailJS etc.
    setEnviado(true);
  };

  return (
    <main className="contact-page">
      {/* ── Hero ── */}
      <section className="contact-hero">
        <span className="contact-badge">📩 Fale conosco</span>
        <h1 className="contact-title">Entre em contato</h1>
        <p className="contact-subtitle">
          Tem alguma dúvida, pedido especial ou quer fazer uma encomenda?<br />
          A gente adora receber mensagens! ❤️
        </p>
      </section>

      {/* ── Conteúdo principal ── */}
      <section className="contact-body">
        {/* Formulário */}
        <div className="contact-form-card">
          {enviado ? (
            <div className="contact-success">
              <span className="success-icon">🎉</span>
              <h2>Mensagem enviada!</h2>
              <p>Em breve entraremos em contato. Obrigada! 🍰</p>
              <button className="btn-send" onClick={() => { setEnviado(false); setForm({ nome:"", email:"", telefone:"", assunto:"", mensagem:"" }); }}>
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2 className="form-title">Mande sua mensagem</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Seu nome</label>
                  <input
                    id="nome" name="nome" type="text"
                    placeholder="Ex: Maria Silva"
                    value={form.nome} onChange={handle} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="Ex: maria@email.com"
                    value={form.email} onChange={handle} required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefone">Telefone / WhatsApp</label>
                  <input
                    id="telefone" name="telefone" type="tel"
                    placeholder="(85) 99999-9999"
                    value={form.telefone} onChange={handle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assunto">Assunto</label>
                  <select id="assunto" name="assunto" value={form.assunto} onChange={handle} required>
                    <option value="">Selecione...</option>
                    <option value="encomenda">Fazer encomenda</option>
                    <option value="kit">Kit festa</option>
                    <option value="delivery">Delivery</option>
                    <option value="duvida">Dúvida geral</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem" name="mensagem" rows={5}
                  placeholder="Conte o que você precisa..."
                  value={form.mensagem} onChange={handle} required
                />
              </div>

              <button type="submit" className="btn-send">
                Enviar mensagem ✉️
              </button>
            </form>
          )}
        </div>

        {/* Informações de contato */}
        <aside className="contact-info">
          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <strong>Endereço</strong>
              <p>Rua das Delícias, 123<br />Fortaleza – CE</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <div>
              <strong>Telefone / WhatsApp</strong>
              <p>(85) 99999-9999</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📧</span>
            <div>
              <strong>E-mail</strong>
              <p>contato@deliciasdajayenne.com.br</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Horário de Atendimento</strong>
              <p>Seg – Sex: 08h às 18h<br />Sábado: 08h às 14h</p>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="contact-socials">
            <p className="socials-label">Nos siga nas redes</p>
            <div className="socials-row">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram">
                📸 Instagram
              </a>
              <a href="https://wa.me/5585999999999" target="_blank" rel="noreferrer" className="social-btn whatsapp">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}