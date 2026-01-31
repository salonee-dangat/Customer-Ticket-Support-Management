import AdminTickets from "./AdminTickets";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <button className="block w-full text-left hover:bg-white/20 p-2 rounded">
            Dashboard
          </button>
          <button className="block w-full text-left hover:bg-white/20 p-2 rounded">
            Tickets
          </button>
          <button className="block w-full text-left hover:bg-white/20 p-2 rounded">
            Users
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Ticket Management
        </h1>

        <AdminTickets />
      </main>
    </div>
  );
}