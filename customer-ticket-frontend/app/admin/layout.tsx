import Sidebar from "../components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#a0237d",
      }}
    >
      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <main
        style={{
          flex: 1,
          padding: "24px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
