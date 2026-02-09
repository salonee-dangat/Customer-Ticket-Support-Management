"use client";

type Props = {
  status: string;
  setStatus: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: any[];
};

export default function TicketFilters({
  status,
  setStatus,
  category,
  setCategory,
  categories,
}: Props) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
