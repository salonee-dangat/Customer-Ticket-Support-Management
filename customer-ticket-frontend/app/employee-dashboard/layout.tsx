"use client";

import { useState } from "react";
import Sidebar from "@/app/employee-dashboard/components/Sidebar";
import EmployeeHeader from "@/app/components/employee/EmployeeHeader";
import Footer from "@/app/employee-dashboard/components/Footer";

export default function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 to-purple-300">

    {/* Header */}
    <EmployeeHeader onMenuClick={() => setIsSidebarOpen(true)} />

    {/* Sidebar + Content */}
    <div className="flex flex-1">

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>

    </div>
  </div>
);
}
