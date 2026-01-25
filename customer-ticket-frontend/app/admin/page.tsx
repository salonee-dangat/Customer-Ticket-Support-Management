import StatCard from "../components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <StatCard title="Total Tickets" value={120} />
        <StatCard title="Open Tickets" value={45} />
        <StatCard title="In Progress" value={30} />
        <StatCard title="Closed Tickets" value={45} />
      </div>
    </div>
  );
}
