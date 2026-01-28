"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then(setSettings);
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = async () => {
    setLoading(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setLoading(false);
    alert("Settings updated successfully");
  };

  if (!settings) return <p>Loading settings...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>
        Admin Settings
      </h1>

      <div style={{ maxWidth: "500px", display: "grid", gap: "14px" }}>
        <input
          name="appName"
          value={settings.appName}
          onChange={handleChange}
          placeholder="Application Name"
        />

        <input
          name="supportEmail"
          value={settings.supportEmail}
          onChange={handleChange}
          placeholder="Support Email"
        />

        <select
          name="defaultPriority"
          value={settings.defaultPriority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="autoAssignTickets"
            checked={settings.autoAssignTickets}
            onChange={handleChange}
          />
          Auto-assign tickets
        </label>

        <input
          type="number"
          name="slaHours"
          value={settings.slaHours}
          onChange={handleChange}
          placeholder="SLA Hours"
        />

        <input
          type="number"
          name="autoCloseDays"
          value={settings.autoCloseDays}
          onChange={handleChange}
          placeholder="Auto close days"
        />

        <label>
          <input
            type="checkbox"
            name="allowReopen"
            checked={settings.allowReopen}
            onChange={handleChange}
          />
          Allow ticket reopen
        </label>

        <button onClick={saveSettings} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
