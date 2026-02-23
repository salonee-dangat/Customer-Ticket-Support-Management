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

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
  { name: "Dashboard", href: "/employee-dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/employee-dashboard/profile", icon: User },
  { name: "Tickets", href: "/employee-dashboard/tickets", icon: Ticket },
  { name: "Settings", href: "/employee-dashboard/settings", icon: Settings },
];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside
      className={`
        relative w-56 h-auto
        bg-gradient-to-b from-pink-300 to-purple-400
        text-gray-900 shadow-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-3">
        <button onClick={() => setIsOpen(false)}>✖</button>
      </div>

      <div className="px-6 py-5 border-b border-purple-400">
        <p className="text-sm text-gray-700">Employee Panel</p>
        <h2 className="text-lg font-semibold tracking-wide text-gray-900">
          Support System
        </h2>
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
                ${
                  active
                    ? "bg-white/70 shadow-md"
                    : "hover:bg-white/40"
                }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}