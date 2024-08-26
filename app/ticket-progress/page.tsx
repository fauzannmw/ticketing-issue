// @/app/ticket-progress/page.tsx
import { Board } from "@/components/section/board";

export default function TicketProgressPage() {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center my-12 px-4 lg:px-0 text-neutral-50">
      <Board />
    </main>
  );
}
