export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Platform Features
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Designed to simplify customer support operations for both users and administrators.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* USER */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">👤 User Features</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Easy ticket creation</li>
              <li>• View ticket status</li>
              <li>• Secure login & registration</li>
              <li>• Simple and clean interface</li>
            </ul>
          </div>

          {/* ADMIN */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🛠️ Admin Features</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• View all tickets</li>
              <li>• Manage users</li>
              <li>• Assign & resolve tickets</li>
              <li>• Admin dashboard access</li>
            </ul>
          </div>

          {/* SYSTEM */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">⚙️ System Features</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Role-based authentication</li>
              <li>• MongoDB database integration</li>
              <li>• Secure APIs</li>
              <li>• Scalable architecture</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
