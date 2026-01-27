
import TicketTable from "@/components/admin/TicketTable";


export default function AdminTicketsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Ticket Management
      </h1>

      <TicketTable />
    </div>
  );
}
