// @/app/kanban-boar/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrashColumn, Column } from "@/components/ui/kanban";
import { TicketTypes } from "@/types";

export const Board: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true); // Set loading menjadi true
      if (session?.user) {
        const response = await fetch("/api/get-all-tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error("Failed to fetch tickets");
        }
      }
      setIsLoading(false); // Set loading menjadi false
    };

    fetchTickets();
  }, [session]);

  return (
    <div className="h-full w-full max-w-screen-xl flex justify-between gap-3 overflow-scroll">
      <Column
        title="Ticket"
        status="PENDING"
        headingColor="text-white"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading} // Pass loading state
      />
      <Column
        title="In progress"
        status="IN_PROGRESS"
        headingColor="text-blue-200"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading} // Pass loading state
      />
      <Column
        title="Complete"
        status="COMPLETE"
        headingColor="text-emerald-200"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading} // Pass loading state
      />
      <TrashColumn setTickets={setTickets} />
      {/* Pass loading state */}
    </div>
  );
};
