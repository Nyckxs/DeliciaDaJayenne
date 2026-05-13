import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart({ items = [], setItems = () => {} }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="cart-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir carrinho"
      >
        <CartIcon />
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>

      {open && (
        <>
          <div className="cart-overlay" onClick={() => setOpen(false)} />
          <div className="cart-dropdown">
            <div className="cart-header">
              <span className="cart-title">
                Meu carrinho
                {count > 0 && (
                  <span className="cart-count-label">
                    ({count} {count === 1 ? "item" : "itens"})
                  </span>
                )}
              </span>
              <button className="cart-close-btn" onClick={() => setOpen(false)} aria-label="Fechar carrinho">
                <CloseIcon />
              </button>
            </div>

            <div className="cart-list">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <EmptyCartIcon />
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img">{item.emoji || "📦"}</div>
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <div className="cart-qty-controls">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeItem(item.id)} aria-label="Remover item">
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-value">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Finalizar compra
                </button>
                <button className="cart-continue-btn" onClick={() => setOpen(false)}>
                  Continuar comprando
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
function EmptyCartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}