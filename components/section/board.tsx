// @/app/kanban-board/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { TrashColumn, Column } from "@/components/ui/kanban";

import { TicketTypes } from "@/types";
import { toast } from "sonner";
import { departments } from "@/data/departments";
import Image from "next/image";

export const Board: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  console.log(typeof selectedDivision);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);

      if (!session?.user) return;

      let response;
      const headers = {
        "Content-Type": "application/json",
        "User-Id": String(session.user.userId),
      };

      if (selectedDivision) {
        response = await fetch(
          `/api/get-tickets-by-division/${selectedDivision}`,
          {
            method: "GET",
            headers,
          }
        );
      } else {
        response = await fetch("/api/get-all-tickets", {
          method: "GET",
          headers,
        });
      }

      if (response?.ok) {
        const data = await response.json();
        setTickets(data);
      } else if (response?.status === 404) {
        toast("Tickets Empty");
        setTickets([]);
      } else {
        console.error("Failed to fetch tickets");
      }

      setIsLoading(false);
    };

    fetchTickets();
  }, [selectedDivision, session]);

  return (
    <div className="h-full w-full max-w-screen-xl flex flex-col justify-between items-center gap-6 overflow-scroll">
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-10">
          <div className="w-24 h-24 relative">
            <Image src={"/assets/images/loading-animation.gif"} alt="" fill />
          </div>
        </div>
      )}
      <div className="w-full lg:w-1/2 flex justify-center items-end gap-3">
        <Select
          label="Filter Ticket by Author Division"
          labelPlacement="outside"
          radius="sm"
          size="md"
          variant="bordered"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          classNames={{
            label: "text-white",
            value: "text-white",
          }}
        >
          {departments
            .filter(
              (department) =>
                department.key !== String(session?.user?.userDivisionId)
            )
            .map((department) => (
              <SelectItem key={department.key} value={department.key}>
                {department.label}
              </SelectItem>
            ))}
        </Select>
        <Button
          onClick={() => setSelectedDivision("0")}
          variant="bordered"
          radius="sm"
          className="px-6 text-white"
        >
          See All Tickets
        </Button>
      </div>
      <div className="w-full flex justify-around gap-3">
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
    </div>
  );
};
