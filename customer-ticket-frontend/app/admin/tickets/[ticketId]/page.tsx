"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TicketChat from "@/app/components/TicketChat";

export default function TicketPage() {
  const params = useParams();

  // ✅ FIXED: param name must match folder name [ticketId]
  const ticketId = params?.ticketId as string;

  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    if (!ticketId) return;

    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setTicket(data);
        } else {
          console.error("API error:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!ticket) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="h-full">
      <TicketChat ticket={ticket} />
    </div>
  );
}