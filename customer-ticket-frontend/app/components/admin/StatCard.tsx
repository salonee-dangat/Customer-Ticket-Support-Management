export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        padding: "16px",
        background: "#435c75",
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ fontSize: "24px", color: "#070707" }}>
        {title}
      </h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {value}
      </p>
    </div>
  );
}
