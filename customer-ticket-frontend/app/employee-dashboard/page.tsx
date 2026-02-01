import Link from "next/link";

export default function EmployeeDashboard() {
  const employeeName = "Employee"; // later dynamic

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white px-10 py-12">

      {/* Top Welcome */}
      <div className="mb-16">
        <h1 className="text-5xl font-semibold tracking-tight">
          Hello, {employeeName} 👋
        </h1>

        <p className="mt-5 text-xl text-purple-100 max-w-4xl leading-relaxed">
          Welcome to your employee workspace. From here, you can create support tickets,
          track their progress, and manage your daily activities in one unified place.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">

        {/* Create Ticket */}
        <Link href="/dashboard">
          <div className="cursor-pointer bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-10 shadow-2xl hover:scale-[1.02] transition-all">
            <h2 className="text-3xl font-medium mb-4">🎫 Create Ticket</h2>
            <p className="text-purple-100 text-lg leading-relaxed">
              Raise a new support ticket for any issue or request. Provide details and
              submit it instantly for tracking and resolution.
            </p>
          </div>
        </Link>

        {/* Track Tickets */}
        <Link href="/dashboard">
          <div className="cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-700 rounded-3xl p-10 shadow-2xl hover:scale-[1.02] transition-all">
            <h2 className="text-3xl font-medium mb-4">📊 Track Tickets</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              View all tickets you have raised, check their current status, and follow
              updates as they move through the support process.
            </p>
          </div>
        </Link>

        {/* Profile / Settings */}
        <Link href="/employee-dashboard/profile">
          <div className="cursor-pointer bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/20 hover:scale-[1.02] transition-all">
            <h2 className="text-3xl font-medium mb-4">⚙️ Account Overview</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              You are logged in with employee access. Your account allows you to raise,
              manage, and monitor tickets efficiently within the system.
            </p>
          </div>
        </Link>
      </div>

      {/* Activity Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 mb-20">
        <h3 className="text-3xl font-medium mb-6">
          📌 Ticket Activity & Workflow
        </h3>

        <p className="text-lg text-gray-200 leading-relaxed mb-4">
          Every ticket you create is recorded and tracked systematically. You can
          monitor responses, updates, and resolutions in real time to stay informed
          without unnecessary follow-ups.
        </p>

        <p className="text-lg text-gray-200 leading-relaxed">
          This dashboard ensures transparency, efficiency, and a smooth communication
          flow between you and the support team.
        </p>
      </div>

      {/* Bottom Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gradient-to-br from-purple-700 to-indigo-700 rounded-3xl p-10 shadow-xl">
          <h4 className="text-2xl font-medium mb-3">🔒 Secure Environment</h4>
          <p className="text-purple-100 text-lg leading-relaxed">
            Your data and tickets are securely handled within the system, ensuring
            privacy and reliability at all times.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-3xl p-10 shadow-xl">
          <h4 className="text-2xl font-medium mb-3">🚀 Efficient Experience</h4>
          <p className="text-pink-100 text-lg leading-relaxed">
            Designed with simplicity and performance in mind, this dashboard helps you
            complete tasks faster and with confidence.
          </p>
        </div>

      </div>

      {/* Footer Line */}
      <div className="mt-20 text-center text-purple-200 text-sm">
        Built for a smooth and professional employee experience ✨
      </div>

    </div>
  );
}
