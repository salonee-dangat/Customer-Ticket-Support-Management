"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Store token
      localStorage.setItem("token", data.token);

      // ✅ Store role
      localStorage.setItem("role", data.user.role);

      // ✅ VERY IMPORTANT: Store userId for chat alignment
      localStorage.setItem("userId", data.user._id?.toString());

      // ✅ Optional cleanup (removes old wrong values if any)
      console.log("Saved userId:", data.user._id);

      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee-dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-lg border border-white/40 p-10 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300"
      >
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-purple-600 mb-6 text-sm">
          Login to manage your support tickets
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}