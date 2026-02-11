"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";



export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employee-dashboard");

  return (
    <>
      {/* Show Home Header only if NOT dashboard */}
      {!isDashboardRoute && <Header />}

      <main className="min-h-[calc(100vh-160px)]">
        {children}
      </main>

      {!isDashboardRoute && <Footer />}
    </>
  );
}
