"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export const departments = [
  { key: "1", label: "IT" },
  { key: "2", label: "Human Resource" },
];

export default function TicketFormPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [issue, setIssue] = useState("");
  const [divisionId, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Cek apakah user sudah login
    if (!session?.user) {
      console.error("User is not authenticated");
      return;
    }

    // Melakukan pemanggilan api create-ticket
    const response = await fetch("/api/create-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue,
        divisionId,
        userId: session.user.userId,
      }),
    });

    setIssue("");
    setDivision("");

    if (response.ok) {
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
          label="Task"
          radius="sm"
          variant="bordered"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <Select
          label="Assign To"
          radius="sm"
          variant="bordered"
          onChange={(e) => setDivision(e.target.value)}
        >
          {departments.map((department) => (
            <SelectItem key={department.key} value={department.key}>
              {department.label}
            </SelectItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="ghost"
          radius="sm"
          size="lg"
          isLoading={isLoading}
          className="p-3 font-semibold"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
