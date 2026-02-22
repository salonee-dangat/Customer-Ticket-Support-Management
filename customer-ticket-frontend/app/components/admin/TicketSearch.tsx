"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function TicketSearch({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search tickets..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 rounded mb-4 bg-gray-800 text-white"
    />
  );
}
