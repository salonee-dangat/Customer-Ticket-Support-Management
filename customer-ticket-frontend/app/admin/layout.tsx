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

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        
        {/* Sidebar (Fixed) */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Wrapper (IMPORTANT FIX) */}
        <div className="ml-[240px] flex flex-col flex-1 min-h-screen">
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>

          {/* Footer BELOW content */}
          <Footer />

        </div>
      </div>
    </div>
  );
}