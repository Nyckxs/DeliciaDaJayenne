import { useState } from "react";
 
const initialItems = [
];
 
export default function Cart() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
 
  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
 
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
 
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
 
  return (
    <div style={{ position: "relative" }}>
      {/* Botão do carrinho */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir carrinho"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "8px",
          color: "#0f172a",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <CartIcon />
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              background: "#e24b4a",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              borderRadius: "999px",
              minWidth: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {count}
          </span>
        )}
      </button>
 
      {/* Dropdown do carrinho */}
      {open && (
        <>
          {/* Overlay para fechar */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 998,
            }}
          />
 
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: "360px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
              zIndex: 999,
              overflow: "hidden",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            {/* Header do dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px 12px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "15px", color: "#0f172a" }}>
                Meu carrinho
                {count > 0 && (
                  <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "13px", marginLeft: "6px" }}>
                    ({count} {count === 1 ? "item" : "itens"})
                  </span>
                )}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar carrinho"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "4px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                <CloseIcon />
              </button>
            </div>
 
            {/* Lista de itens */}
            <div style={{ maxHeight: "320px", overflowY: "auto", padding: "8px 0" }}>
              {items.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    gap: "10px",
                    color: "#94a3b8",
                  }}
                >
                  <EmptyCartIcon />
                  <p style={{ margin: 0, fontSize: "14px" }}>Seu carrinho está vazio</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 20px",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Imagem */}
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "10px",
                        background: "#f1f5f9",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        overflow: "hidden",
                      }}
                    >
                      {item.emoji || "📦"}
                    </div>
 
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: "0 0 2px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#0f172a",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
 
                    {/* Controles de quantidade */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                      <QtyButton onClick={() => updateQty(item.id, -1)} label="−" />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#0f172a",
                          minWidth: "16px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <QtyButton onClick={() => updateQty(item.id, 1)} label="+" />
                    </div>
 
                    {/* Remover */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remover item"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#cbd5e1",
                        padding: "4px",
                        borderRadius: "6px",
                        display: "flex",
                        flexShrink: 0,
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#e24b4a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
 
            {/* Footer com total e botão */}
            {items.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#64748b" }}>Total</span>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "13px",
                    background: "#0f172a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.3px",
                    transition: "background 0.15s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onClick={() => alert("Ir para checkout!")}
                >
                  Finalizar compra
                </button>
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "none",
                    color: "#64748b",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                  onClick={() => setOpen(false)}
                >
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
 
function QtyButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "26px",
        height: "26px",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        background: "#fff",
        cursor: "pointer",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#475569",
        flexShrink: 0,
        transition: "background 0.1s, border-color 0.1s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f1f5f9";
        e.currentTarget.style.borderColor = "#cbd5e1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      {label}
    </button>
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
