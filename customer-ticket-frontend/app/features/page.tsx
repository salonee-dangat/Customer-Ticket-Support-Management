"use client";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 px-6 py-20">

      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Platform Features
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto mb-16">
          Designed to simplify customer support operations for both users and administrators. 
          Our platform provides a seamless experience, ensuring efficiency, security, and ease of use.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* USER FEATURES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">👤 User Features</h3>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>• Easy ticket creation</li>
            <li>• View ticket status</li>
            <li>• Secure login & registration</li>
            <li>• Simple and clean interface</li>
          </ul>
        </div>

        {/* ADMIN FEATURES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">🛠️ Admin Features</h3>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>• View all tickets</li>
            <li>• Manage users</li>
            <li>• Assign & resolve tickets</li>
            <li>• Admin dashboard access</li>
          </ul>
        </div>

        {/* SYSTEM FEATURES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">⚙️ System Features</h3>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>• Role-based authentication</li>
            <li>• MongoDB database integration</li>
            <li>• Secure APIs</li>
            <li>• Scalable architecture</li>
          </ul>
        </div>

      </div>

      {/* CTA / Highlight */}
      <div className="max-w-4xl mx-auto mt-20 bg-purple-100/70 rounded-3xl p-10 text-center shadow-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">Why Choose Our Platform?</h2>
        <p className="text-gray-700 text-lg mb-6">
          Our system combines intuitive design, robust security, and real-time updates to ensure both users and administrators have a smooth, reliable, and professional experience.
        </p>
      </div>

    </div>
  );
}
