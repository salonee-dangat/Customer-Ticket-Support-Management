"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* HERO */}
      <section className="text-center px-6 py-28">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Smart Customer Support Ticket System
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-10">
          A modern platform to manage customer issues efficiently, improve response time,
          and deliver better support experiences for users and admins.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/register"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-purple-400 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-100"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Easy Ticket Creation",
            desc: "Customers can raise issues easily with clear tracking and updates.",
            icon: "🎫",
          },
          {
            title: "Admin Dashboard",
            desc: "Admins manage tickets, users, and resolutions from one place.",
            icon: "🛠️",
          },
          {
            title: "Secure & Reliable",
            desc: "Authentication, role-based access, and secure data handling.",
            icon: "🔐",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Start managing support tickets effortlessly
        </h2>

        <Link
          href="/register"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-4 rounded-xl font-semibold hover:opacity-90"
        >
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
}
