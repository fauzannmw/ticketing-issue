// @/app/page.tsx
import { ProgressList } from "@/components/section/progress-list";

export default function HomePage() {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center my-12 text-neutral-50">
      <ProgressList />
    </main>
  );
}
