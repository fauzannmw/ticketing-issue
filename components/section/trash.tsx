"use client";
import { Input, Select, SelectItem } from "@nextui-org/react";

// Tambahkan tipe untuk department
export type Department = {
  key: string;
  label: string;
};

// export const departments: Array<Department> = [
//   { key: "it", label: "IT" },
//   { key: "marketing", label: "Marketing" },
//   { key: "reporter", label: "Reporter" },
//   { key: "socialmedia", label: "Socialmedia" },
//   { key: "hc", label: "HC" },
// ];

export default function TicketFormPage() {
  return (
    <div className="w-full h-full min-h-screen flex justify-center my-12">
      <form
        action=""
        className="max-w-3xl w-full h-full flex flex-col p-4 gap-4 bg-white rounded-md"
      >
        <h1 className="text-lg font-semibold">Assign Ticket</h1>
        <Input type="text" label="Task" radius="sm" variant="bordered" />
        {/* <Select label="Assign To" radius="sm" variant="bordered">
          {departments.map((department) => (
            <SelectItem key={department.key}>{department.label}</SelectItem>
          ))}
        </Select> */}
        <button className="p-3 border-2 border-zinc-200 rounded-md font-semibold hover:border-zinc-400 transition duration-500">
          Submit
        </button>
      </form>
    </div>
  );
}
