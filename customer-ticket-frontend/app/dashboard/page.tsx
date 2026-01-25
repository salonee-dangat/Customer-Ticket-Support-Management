import TicketForm from "./components/TicketForm";
import MyTickets from "./components/MyTickets";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      <TicketForm />

      <hr />

      <MyTickets />
    </div>
  );
}
