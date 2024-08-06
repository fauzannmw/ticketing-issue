"use client";
import { ticket_data } from "@/data/ticket";
import { CardTypes } from "@/types";
import { useState } from "react";
import { BurnBarrel, Column } from "@/components/ui/kanban";

export const Board: React.FC = () => {
  const [cards, setCards] = useState<CardTypes[]>(ticket_data);

  return (
    <div className="h-full w-full max-w-screen-xl flex justify-between gap-3 overflow-scroll">
      <Column
        title="Ticket"
        column="backlog"
        headingColor="text-white"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="in-progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="complete"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
