export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
     <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}