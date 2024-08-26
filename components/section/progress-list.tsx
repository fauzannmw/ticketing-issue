// @/app/progress-list/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";

import { TicketTypes } from "@/types";
import { CiWarning } from "react-icons/ci";
import { TicketDetailModal } from "../ui/modal-detail";
import { TicketProgresModal } from "../ui/modal-progress";

export const ProgressList: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);

      if (!session?.user) {
        setError("You must be logged in to view tickets.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/get-all-tickets-progress", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Id": String(session.user.userId),
          },
        });

        if (response.ok) {
          let data = await response.json();

          data = data.sort((a: TicketTypes, b: TicketTypes) => {
            const statusOrder = ["backlog", "in_progress", "complete"];
            return (
              statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
            );
          });

          setTickets(data);
        } else if (response.status === 404) {
          setTickets([]);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch tickets.");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("An unexpected error occurred while fetching tickets.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [session]);

  return (
    <Card radius="sm" className="w-11/12 md:w-1/2">
      <CardHeader className="justify-center">
        <h2 className="text-xl font-bold">Tickets Progress</h2>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <CiWarning className="h-12 w-12 text-danger mb-4" />
            <p className="text-lg text-danger">{error}</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-lg text-default-500">No tickets found.</p>
          </div>
        ) : (
          <Table
            aria-label="List of Tickets"
            shadow="none"
            selectionMode="none"
            classNames={{
              base: "overflow-visible",
            }}
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Issue</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Author</TableColumn>
              <TableColumn>Target Division</TableColumn>
              <TableColumn>Lihat Detail</TableColumn>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-center text-sm font-medium ${
                        ticket.status === "complete"
                          ? "bg-green-200 text-green-800"
                          : ticket.status === "in_progress"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>{ticket.authorName}</TableCell>
                  <TableCell>{ticket.divisionName}</TableCell>
                  <TableCell>
                    <TicketProgresModal ticketId={ticket.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};
