// @/app/kanban-board/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrashColumn, Column } from "@/components/ui/kanban";
import { TicketTypes } from "@/types";

export const Board: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchTickets();
  }, [session]);

  return (
    <div className="h-full w-full max-w-screen-xl flex justify-between gap-3 overflow-scroll">
      <Column
        title="Ticket"
        status="backlog"
        headingColor="text-white"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Column
        title="In progress"
        status="in_progress"
        headingColor="text-blue-200"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Column
        title="Complete"
        status="complete"
        headingColor="text-emerald-200"
        tickets={tickets}
        setTickets={setTickets}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <TrashColumn setTickets={setTickets} />
    </div>
  );
};
