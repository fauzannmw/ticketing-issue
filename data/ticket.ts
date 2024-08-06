import { CardTypes } from "@/types";

export const ticket_data: CardTypes[] = [
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "in-progress" },
  {
    title: "Refactor context providers to use Zustand",
    id: "5",
    column: "in-progress",
  },
  { title: "Add logging to daily CRON", id: "6", column: "in-progress" },
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "7",
    column: "complete",
  },
];
