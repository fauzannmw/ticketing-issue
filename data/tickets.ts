import { CardTypes } from "@/types";

export const ticket_data: CardTypes[] = [
  {
    id: "1",
    issue: "Look into render bug in dashboard",
    status: "backlog",
    authorName: "Alice Smith",
  },
  {
    id: "2",
    issue: "SOX compliance checklist",
    status: "backlog",
    authorName: "Bob Johnson",
  },
  {
    id: "3",
    issue: "[SPIKE] Migrate to Azure",
    status: "backlog",
    authorName: "Charlie Davis",
  },
  {
    id: "4",
    issue: "Document Notifications service",
    status: "in-progress",
    authorName: "David Lee",
  },
  {
    id: "5",
    issue: "Refactor context providers to use Zustand",
    status: "in-progress",
    authorName: "Eva Brown",
  },
  {
    id: "6",
    issue: "Add logging to daily CRON",
    status: "in-progress",
    authorName: "Frank Wilson",
  },
  {
    id: "7",
    issue: "Set up DD dashboards for Lambda listener",
    status: "complete",
    authorName: "Grace Miller",
  },
];
