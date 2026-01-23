export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 space-y-2">
        <p className="font-semibold text-gray-800">SupportHub</p>
        <p>A simple customer support ticket management system.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-pink-600">Home</a>
          <a href="#" className="hover:text-pink-600">About</a>
          <a href="#" className="hover:text-pink-600">Features</a>
          <a href="#" className="hover:text-pink-600">Contact</a>
        </div>
        <p className="mt-2 text-sm text-gray-500">© 2026 SupportHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
