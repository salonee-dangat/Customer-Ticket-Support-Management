"use client";

import { useState } from "react";
import Sidebar from "@/app/components/admin/sidebar";
import AdminHeader from "@/app/components/admin/AdminHeader";
import Footer from "@/app/components/Footer";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    helpdeskName: "SupportHub",
    timezone: "GMT +5:30 (India Standard Time)",
    language: "English",
    supportEmail: "support@example.com",
    phoneNumber: "+91 9876543210",
    workingHours: "Mon-Fri, 9AM-6PM",
    maxTicketLimit: 50,
    defaultPriority: "Medium",
    notificationEmail: "notify@example.com",
    themeMode: "Light",
    logoURL: "https://via.placeholder.com/150",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    setSuccess("Settings saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={true} setIsOpen={() => {}} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader onMenuClick={() => {}} />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-10 text-center text-pink-300">
            Admin Settings
          </h1>

          <form
            onSubmit={handleSave}
            className="max-w-5xl mx-auto bg-gray-800 p-10 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {success && (
              <p className="text-green-400 font-semibold col-span-2 text-center">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-500 font-semibold col-span-2 text-center">
                {error}
              </p>
            )}

            {/* Helpdesk Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Helpdesk Name
              </label>
              <input
                type="text"
                name="helpdeskName"
                value={settings.helpdeskName}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Timezone */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Timezone</label>
              <input
                type="text"
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Language */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Language</label>
              <input
                type="text"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Support Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Working Hours */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={settings.workingHours}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Max Ticket Limit */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Max Ticket Limit</label>
              <input
                type="number"
                name="maxTicketLimit"
                value={settings.maxTicketLimit}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Default Ticket Priority */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Default Ticket Priority
              </label>
              <select
                name="defaultPriority"
                value={settings.defaultPriority}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Notification Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Notification Email
              </label>
              <input
                type="email"
                name="notificationEmail"
                value={settings.notificationEmail}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              />
            </div>

            {/* Theme Mode */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">Theme Mode</label>
              <select
                name="themeMode"
                value={settings.themeMode}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-900 text-white hover:shadow-md transition-all"
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="col-span-2 w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all"
            >
              Save Settings
            </button>
          </form>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
