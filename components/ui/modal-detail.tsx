import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ModalUiProps {
  ticketId: string;
}

interface TicketDetail {
  id: string;
  issue: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  author: Author;
}

interface Author {
  name: string;
}

export const TicketDetailModal: React.FC<ModalUiProps> = ({ ticketId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    const fetchTicketDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/get-ticket-by-id/${ticketId}`);
        const data = await response.json();
        setTicketDetail(data);
      } catch (error) {
        console.error("Failed to fetch ticket details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isOpen) {
      fetchTicketDetail();
    }
  }, [isOpen, ticketId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSubmit = async () => {
    if (!newStatus) return;

    try {
      const response = await fetch("/api/update-ticket-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId, status: newStatus }),
      });

      if (response.ok) {
        setTicketDetail((prev) =>
          prev ? { ...prev, status: newStatus } : prev
        );
        toast(`Ticket Status changed to ${newStatus}`);
        setNewStatus("");
      } else {
        console.error("Failed to update ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="w-full flex justify-center items-center p-0.5 border-1 border-white rounded-md text-sm hover:scale-105 duration-250"
      >
        See Detail
      </button>
      <Modal
        size="xl"
        radius="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="font-mono"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Ticket Detail</ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <p>Loading...</p>
                ) : ticketDetail ? (
                  <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-md bg-white">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Ticket Id</span>
                        <span className="font-medium">{ticketDetail.id}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">
                          Author Name
                        </span>
                        <span className="font-medium">
                          {ticketDetail.author?.name || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="text-sm text-gray-500">Issue</span>
                        <p className="font-medium">{ticketDetail.issue}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Description
                        </span>
                        <p className="text-sm text-gray-700">
                          {ticketDetail.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Status</span>
                        <span
                          className={`px-2 py-1 rounded-full text-center text-sm font-medium ${
                            ticketDetail.status === "complete"
                              ? "bg-green-200 text-green-800"
                              : ticketDetail.status === "in_progress"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {ticketDetail.status}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Priority</span>
                        <span
                          className={`px-2 py-1 rounded-full text-center text-sm font-medium ${
                            ticketDetail.priority === "high"
                              ? "bg-red-200 text-red-800"
                              : ticketDetail.priority === "medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {ticketDetail.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Due Date</span>
                      <span className="font-medium">
                        {formatDate(ticketDetail.dueDate)}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                      <div className="w-full flex flex-col">
                        <Select
                          label="New Status"
                          labelPlacement="outside"
                          radius="sm"
                          size="md"
                          variant="bordered"
                          onChange={(e) => setNewStatus(e.target.value)}
                        >
                          <SelectItem key={"backlog"} value={"backlog"}>
                            backlog
                          </SelectItem>
                          <SelectItem key={"in_progress"} value={"in_progress"}>
                            in_progress
                          </SelectItem>
                          <SelectItem key={"complete"} value={"complete"}>
                            complete
                          </SelectItem>
                        </Select>
                      </div>
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="ghost"
                        radius="sm"
                        size="md"
                        isLoading={isLoading}
                        className="p-3 font-semibold"
                      >
                        Change Status
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p>No details available for this ticket.</p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
