// @/app/ticket-form/page.tsx
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { toast } from "sonner";

import { getLocalTimeZone, today, DateValue } from "@internationalized/date";
import { dateToIso } from "@/lib/utils/date";
import { departments } from "@/data/departments";

export default function TicketFormPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [issue, setIssue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [divisionId, setDivision] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [dueDate, setDueDate] = useState<DateValue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dueDateISO = dueDate ? dateToIso(dueDate) : null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session?.user) {
      console.error("User is not authenticated");
      return;
    }

    const response = await fetch("/api/create-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue,
        description,
        divisionId,
        priority,
        dueDate: dueDateISO,
        userId: session.user.userId,
      }),
    });

    setIssue("");
    setDescription("");
    setDivision("");
    setPriority("");
    setDueDate(null);

    if (response.ok) {
      toast("Success Create Ticket");
      router.push("/");
    } else {
      console.error("Failed to create ticket");
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center my-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full h-full flex flex-col p-4 gap-4 bg-white rounded-md"
      >
        <h1 className="text-lg font-semibold">Assign Ticket</h1>
        <Input
          type="text"
          label="Ticket Name"
          radius="sm"
          variant="bordered"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <Textarea
          variant="bordered"
          radius="sm"
          label="Ticket Description"
          placeholder="......"
          description="Enter a concise description of your Ticket."
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          label="Assign To (Division)"
          radius="sm"
          variant="bordered"
          onChange={(e) => setDivision(e.target.value)}
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

        <Select
          label="Priority Level"
          radius="sm"
          variant="bordered"
          onChange={(e) => setPriority(e.target.value)}
        >
          <SelectItem key={"low"} value={"low"}>
            low
          </SelectItem>
          <SelectItem key={"medium"} value={"medium"}>
            medium
          </SelectItem>
          <SelectItem key={"high"} value={"high"}>
            high
          </SelectItem>
        </Select>
        <DatePicker
          label="Due Date"
          variant="bordered"
          showMonthAndYearPickers
          minValue={today(getLocalTimeZone())}
          onChange={setDueDate}
        />
        <Button
          type="submit"
          variant="ghost"
          radius="sm"
          size="lg"
          isLoading={isLoading}
          className="p-3 font-semibold"
        >
          Submit Ticket
        </Button>
      </form>
    </div>
  );
}
