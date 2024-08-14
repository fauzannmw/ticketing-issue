"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BurnBarrel, Column } from "@/components/ui/kanban";

import { ticket_data } from "@/data/tickets";
import { CardTypes } from "@/types";

export const Board: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<CardTypes[]>([]);

  const [cards, setCards] = useState<CardTypes[]>(ticket_data);

  useEffect(() => {
    const fetchTickets = async () => {
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
    };

    fetchTickets();
  }, [session]);

  console.log(tickets);

  // backlog, in-progress, complete
  return (
    <div className="h-full w-full max-w-screen-xl flex justify-between gap-3 overflow-scroll">
      <Column
        title="Ticket"
        status="PENDING"
        headingColor="text-white"
        // cards={cards}
        // setCards={setCards}
        tickets={tickets}
        setTickets={setTickets}
      />
      <Column
        title="In progress"
        status="IN_PROGRESS"
        headingColor="text-blue-200"
        // cards={cards}
        // setCards={setCards}
        tickets={tickets}
        setTickets={setTickets}
      />
      <Column
        title="Complete"
        status="COMPLETE"
        headingColor="text-emerald-200"
        // cards={cards}
        // setCards={setCards}
        tickets={tickets}
        setTickets={setTickets}
      />
      <BurnBarrel
        // setCards={setCards}
        setTickets={setTickets}
      />
    </div>
  );
};
