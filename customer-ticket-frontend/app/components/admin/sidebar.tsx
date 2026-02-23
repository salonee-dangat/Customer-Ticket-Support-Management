"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Tickets", href: "/admin/tickets" },
    { name: "Settings", href: "/admin/settings" },
    { name: "Notifications", href: "/admin/notifications" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5050/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
  

      <aside
        className={`relative w-[240px] 
        bg-gray-900 text-white flex flex-col
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 px-5 flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout at Bottom */}
        {/* Logout at Bottom */}
<div className="p-5 mt-auto">
  <button
    onClick={handleLogout}
    className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
  >
    Logout
  </button>
</div>
      </aside>
    </>
  );
}