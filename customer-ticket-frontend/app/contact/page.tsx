export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-6 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-12 grid md:grid-cols-2 gap-12">
        
        {/* LEFT INFO */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 mb-8">
            Need help or have questions? Reach out to us anytime — we’re happy to assist you.
          </p>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold">📍 Address</h3>
              <p>
                Customer Support Pvt Ltd<br />
                Hinjawadi Phase 1<br />
                Pune, Maharashtra – 411057
              </p>
            </div>

            <div>
              <h3 className="font-semibold">📞 Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-semibold">✉️ Email</h3>
              <p>support@customersupport.com</p>
            </div>

            <div>
              <h3 className="font-semibold">🕒 Working Hours</h3>
              <p>Monday – Friday | 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send us a message
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            ></textarea>

            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
