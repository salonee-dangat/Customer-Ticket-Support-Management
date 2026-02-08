
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 p-6 space-y-12">

      {/* Original content */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">About Customer Support Hub</h1>

        <p className="text-gray-700 leading-relaxed">
          Customer Support Hub is a cutting-edge ticket management system designed to streamline your customer support process.
          Track, manage, and resolve customer queries efficiently from a single platform. Ideal for IT teams, support staff, and businesses aiming for fast response and high customer satisfaction.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Fast ticket creation and tracking</li>
          <li>Separate dashboards for users and admins</li>
          <li>Real-time ticket updates and notifications</li>
          <li>Mobile-friendly interface for on-the-go support</li>
          <li>Easy to integrate into existing systems</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to simplify customer support for businesses of all sizes. Our goal is to reduce response times and improve customer satisfaction through an intuitive and modern ticketing system.
        </p>
      </div>

      {/* 🌟 Highlight Box */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Vision</h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          To create a world where customer support is seamless, fast, and delightful, 
          empowering businesses to build trust and loyalty with every interaction.
        </p>
      </div>

      {/* 👩‍💻 Team Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alice Johnson", role: "Product Manager", emoji: "👩‍💼" },
            { name: "Bob Smith", role: "Lead Developer", emoji: "💻" },
            { name: "Clara Lee", role: "UI/UX Designer", emoji: "🎨" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🎉 Call-to-action Banner */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl p-10 text-center shadow-xl">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">Join Us Today!</h2>
        <p className="text-gray-700 text-lg mb-6">
          Experience a smarter way to manage support tickets and delight your customers.
        </p>
        <Link
          href="/register"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition inline-block"
        >
          Get Started
        </Link>
      </div>

    </div>
  );
}
