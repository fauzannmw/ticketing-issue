import { TicketTypes } from "@/types";

export const ticket_data: TicketTypes[] = [
  {
    id: "1",
    issue: "Look into render bug in dashboard",
    status: "backlog",
    authorName: "Alice Smith",
    authorDivision: "Technology",
  },
  {
    id: "2",
    issue: "SOX compliance checklist",
    status: "backlog",
    authorName: "Bob Johnson",
    authorDivision: "Human Resource",
  },
  {
    id: "3",
    issue: "[SPIKE] Migrate to Azure",
    status: "backlog",
    authorName: "Charlie Davis",
    authorDivision: "Technology",
  },
  {
    id: "4",
    issue: "Document Notifications service",
    status: "in-progress",
    authorName: "David Lee",
    authorDivision: "Creative",
  },
  {
    id: "5",
    issue: "Refactor context providers to use Zustand",
    status: "in-progress",
    authorName: "Eva Brown",
    authorDivision: "Technology",
  },
  {
    id: "6",
    issue: "Add logging to daily CRON",
    status: "in-progress",
    authorName: "Frank Wilson",
    authorDivision: "Human Resource",
  },
  {
    id: "7",
    issue: "Set up DD dashboards for Lambda listener",
    status: "complete",
    authorName: "Grace Miller",
    authorDivision: "Creative",
  },
];
