export default function TicketList({ tickets }: { tickets: any[] }) {
  if (!tickets.length) {
    return <p>No tickets found.</p>;
  }

  return (
    <div className="grid gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="p-4 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          <h3 className="font-bold text-lg">{ticket.title}</h3>
          <p>Status: {ticket.status}</p>
          <p>Category: {ticket.category?.name}</p>
        </div>
      ))}
    </div>
  );
}
