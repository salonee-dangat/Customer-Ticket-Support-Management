export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
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
  );
}
