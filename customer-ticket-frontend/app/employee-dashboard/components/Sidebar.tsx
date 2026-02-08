"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/employee-dashboard", icon: LayoutDashboard },
    { name: "Tickets", href: "/employee-dashboard/tickets", icon: Ticket },
    { name: "Profile", href: "/employee-dashboard/profile", icon: User },
    { name: "Settings", href: "/employee-dashboard/settings", icon: Settings },
  ];

  // ✅ Logout function
  const handleLogout = () => {
    // Remove token or session data
    localStorage.removeItem("token"); // if using token in localStorage
    // You can also clear cookies if you store token there
    // Redirect to login page
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 bg-gradient-to-b from-purple-950 to-indigo-950 text-white shadow-xl">

      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-sm text-purple-300">Employee Panel</p>
        <h2 className="text-lg font-semibold tracking-wide">Support System</h2>
      </div>

      <nav className="mt-6 space-y-1 px-3">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${active ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-md" : "hover:bg-white/10"}`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          onClick={handleLogout} // ✅ Attach logout function here
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
