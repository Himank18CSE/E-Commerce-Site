export default function CategoryNav({ setCategory, active }) {
  const categories = [
    { label: "All", value: "all" },
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Electronics", value: "electronics" },
  ];

  return (
    <div style={nav}>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          style={{
            ...btn,
            borderBottom:
              active === cat.value
                ? "3px solid var(--primary)"
                : "3px solid transparent",
            opacity: active === cat.value ? 1 : 0.7,
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

/* ===== STYLES ===== */
const nav = {
  display: "flex",
  gap: 20,
  padding: "10px 20px",
  background: "var(--card)",
  boxShadow: "0 6px 20px var(--shadow)",
};

const btn = {
  background: "transparent",
  color: "var(--text)",
  border: "none",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  paddingBottom: 6,
};
