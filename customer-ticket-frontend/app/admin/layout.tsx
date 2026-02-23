"use client";

import { useState } from "react";
import Sidebar from "@/app/components/admin/sidebar";
import AdminHeader from "@/app/components/admin/AdminHeader";
import Footer from "@/app/components/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 to-purple-300">

    {/* Header */}
    <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

    {/* Sidebar + Content section */}
    <div className="flex flex-1">

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>

    </div>
  </div>
);
}