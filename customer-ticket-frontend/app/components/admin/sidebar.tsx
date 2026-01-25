"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
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
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
        Admin Panel
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "white",
              backgroundColor:
                pathname === item.href ? "#1f2937" : "transparent",
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
