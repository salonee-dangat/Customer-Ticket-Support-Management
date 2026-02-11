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
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-56">

        {/* Header */}
        <EmployeeHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
