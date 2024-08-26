// @/components/ui/kanban.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { TicketDetailModal } from "@/components/ui/modal-detail";

import { FiTrash, FiArrowDown } from "react-icons/fi";
import {
  TicketTypes,
  ColumnProps,
  CardProps,
  DropIndicatorProps,
  TrashColumnProps,
} from "@/types";

export const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  tickets,
  status,
  setTickets,
  isLoading,
  setIsLoading,
}) => {
  const handleDragStart = (e: React.DragEvent, card: TicketTypes) => {
    if (isLoading) return; // Prevent drag-and-drop during loading
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e: React.DragEvent) => {
    if (isLoading) return; // Prevent drag-and-drop during loading
    const cardId = e.dataTransfer.getData("cardId");

    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...tickets];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setTickets(copy);

      setIsLoading(true);
      try {
        const response = await fetch("/api/update-ticket-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketId: cardId, status: status }),
        });

        if (!response.ok) {
          console.error("Failed to update ticket status");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      toast(`Ticket status changed to ${status}`);
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isLoading) return; // Prevent drag-and-drop during loading
    e.preventDefault();
    highlightIndicator(e);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${status}"]`)
    ) as HTMLElement[];
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const filteredTickets = tickets.filter((c) => c.status === status);

  return (
    <div className="w-72 shrink-0 p-4 border border-white rounded-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredTickets.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="my-0.5 border-t-1 border-white"
      >
        {filteredTickets.map((c) => (
          <Card
            key={c.id}
            {...c}
            handleDragStart={handleDragStart}
            isLoading={isLoading}
          />
        ))}
        <DropIndicator beforeId={null} status={status} />
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  id,
  authorName,
  authorDivision,
  issue,
  status,
  handleDragStart,
  isLoading,
}) => {
  return (
    <>
      <DropIndicator beforeId={id} status={status} />
      <motion.div
        layout
        layoutId={id}
        draggable={!isLoading} // Disable drag during loading
        onDragStart={(e) =>
          handleDragStart(e as unknown as React.DragEvent, {
            id,
            issue,
            authorName,
            authorDivision,
            status,
          })
        }
        className={`cursor-grab flex flex-col p-3 gap-1 rounded border border-neutral-700 bg-neutral-800 ${
          isLoading ? "cursor-not-allowed opacity-50" : "active:cursor-grabbing"
        }`}
      >
        <p className="flex flex-col text-sm text-neutral-100">
          <span className="font-semibold border-b-1 border-white">
            Requestor :{" "}
          </span>
          {authorName} ({authorDivision} Division)
        </p>
        <p className="flex flex-col text-sm text-neutral-100">
          <span className="font-semibold border-b-1 border-white">
            Request Issue :{" "}
          </span>
          {issue}
        </p>
        <TicketDetailModal ticketId={id} />
      </motion.div>
    </>
  );
};

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, status }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={status}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

export const TrashColumn: React.FC<TrashColumnProps> = ({ setTickets }) => {
  const [active, setActive] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    // Remove ticket from state
    setTickets((prev) => prev.filter((c) => c.id !== cardId));

    try {
      const response = await fetch("/api/delete-ticket", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId: cardId }),
      });

      if (!response.ok) {
        console.error("Failed to delete ticket");
      } else {
        console.log("Ticket deleted successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    toast("Ticket Deleted Successfully");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDropIndicator = () => {
    setActive(false);
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDropIndicator}
      className={`relative z-10 flex min-w-28 min-h-28 h-full w-full max-w-32 max-h-32 shrink-0 items-center justify-center rounded-md border border-white p-4 shadow-lg shadow-neutral-900 ${
        active ? "bg-red-500" : "bg-red-600"
      }`}
    >
      <FiTrash className="text-2xl text-white" />
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          className="absolute bottom-[-28px] left-1/2 h-6 w-6 translate-x-[-50%] rounded-full bg-white text-red-600"
        >
          <FiArrowDown className="text-2xl text-center" />
        </motion.div>
      )}
    </motion.div>
  );
};
