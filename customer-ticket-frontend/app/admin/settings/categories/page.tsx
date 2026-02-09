"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    setCategories(await res.json());
  };

  const createCategory = async () => {
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Ticket Categories</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="p-2 bg-gray-800 text-white rounded"
        />
        <button
          onClick={createCategory}
          className="px-4 bg-purple-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {categories.map((c: any) => (
          <li key={c._id} className="mb-1">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
