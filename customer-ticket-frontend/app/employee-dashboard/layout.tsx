import Navbar from "@/app/employee-dashboard/components/Navbar";
import Sidebar from "@/app/employee-dashboard/components/Sidebar";
import Footer from "@/app/employee-dashboard/components/Footer";

export default function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">

      {/* Top Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="ml-56 flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
