import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

// ⚠️ Ajuste a porta se a sua API não for 3000
const API_URL = "http://localhost:3000";

export default function Checkout({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    rua: "",
    numeroCasa: "",
    cep: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);

  const formatTelefone = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
      .slice(0, 15);

  const formatCEP = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
      .slice(0, 9);

  const handleMasked = (e) => {
    const { name, value } = e.target;
    let masked = value;
    if (name === "cpf") masked = formatCPF(value);
    if (name === "telefone") masked = formatTelefone(value);
    if (name === "cep") masked = formatCEP(value);
    setForm((prev) => ({ ...prev, [name]: masked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Monta o campo "produto" como texto resumido do carrinho
    const produtoResumo = cartItems
      .map((i) => `${i.name} x${i.quantity} (R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")})`)
      .join(" | ");

    const payload = {
      ...form,
      numeroCasa: Number(form.numeroCasa),
      produto: produtoResumo,
    };

    try {
      const res = await fetch(`${API_URL}/confeitaria`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Erro ${res.status}`);
      }

      setStatus("success");
      setCartItems([]); // limpa o carrinho após pedido confirmado
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Não foi possível conectar à API.");
    }
  };

  /* ── Tela de sucesso ── */
  if (status === "success") {
    return (
      <div className="checkout-success">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2 className="success-title">Pedido Confirmado!</h2>
          <p className="success-text">
            Seu pedido foi registrado com sucesso. Em breve entraremos em contato pelo WhatsApp para confirmar a entrega.
          </p>
          <button className="btn-back-home" onClick={() => navigate("/")}>
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  /* ── Carrinho vazio ── */
  if (cartItems.length === 0) {
    return (
      <div className="checkout-success">
        <div className="success-card">
          <div className="success-icon">🛒</div>
          <h2 className="success-title">Carrinho vazio</h2>
          <p className="success-text">Adicione produtos antes de finalizar o pedido.</p>
          <button className="btn-back-home" onClick={() => navigate("/")}>
            Ver produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* ── Cabeçalho ── */}
      <div className="checkout-hero">
        <h1 className="checkout-hero-title">Finalizar Pedido</h1>
        <p className="checkout-hero-sub">Preencha seus dados para concluir a compra</p>
      </div>

      <div className="checkout-layout">
        {/* ── Formulário ── */}
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <section className="form-section">
            <h2 className="form-section-title">
              <span className="form-section-icon">👤</span> Dados Pessoais
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome completo *</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleMasked}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone / WhatsApp *</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="text"
                  placeholder="(85) 99999-9999"
                  value={form.telefone}
                  onChange={handleMasked}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="form-section-title">
              <span className="form-section-icon">📍</span> Endereço de Entrega
            </h2>

            <div className="form-row">
              <div className="form-group form-group--lg">
                <label htmlFor="rua">Rua / Avenida *</label>
                <input
                  id="rua"
                  name="rua"
                  type="text"
                  placeholder="Nome da rua ou avenida"
                  value={form.rua}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group form-group--sm">
                <label htmlFor="numeroCasa">Número *</label>
                <input
                  id="numeroCasa"
                  name="numeroCasa"
                  type="number"
                  placeholder="123"
                  value={form.numeroCasa}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cep">CEP *</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={handleMasked}
                  required
                />
              </div>
            </div>
          </section>

          {status === "error" && (
            <div className="checkout-error">
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn-checkout-submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="spinner" />
            ) : (
              <>✅ Confirmar Pedido &nbsp;·&nbsp; R$ {total.toFixed(2).replace(".", ",")}</>
            )}
          </button>

          <button type="button" className="btn-checkout-back" onClick={() => navigate("/")}>
            ← Voltar e continuar comprando
          </button>
        </form>

        {/* ── Resumo do pedido ── */}
        <aside className="checkout-summary">
          <h2 className="summary-title">Resumo do Pedido</h2>

          <ul className="summary-list">
            {cartItems.map((item) => (
              <li key={item.id} className="summary-item">
                <span className="summary-item-emoji">{item.emoji || "📦"}</span>
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-qty">x{item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </span>
              </li>
            ))}
          </ul>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-value">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <div className="summary-note">
            🚚 Entrega combinada via WhatsApp após confirmação do pedido.
          </div>
        </aside>
      </div>
    </div>
  );
}