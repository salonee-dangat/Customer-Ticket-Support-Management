"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" }, // Updated to point to new dashboard page
    { name: "Users", href: "/admin/users" },
    { name: "Tickets", href: "/admin/tickets" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#111827",
        color: "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Admin Panel</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href); // highlight parent routes too

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                color: "white",
                backgroundColor: isActive ? "#1f2937" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
