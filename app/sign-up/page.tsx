// @/app/sign-up/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    divisionId: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast("Success Register User");
        router.push("/sign-in");
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-full w-11/12 md:w-1/2 flex justify-center items-center my-12 text-neutral-50">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <h1 className="text-xl font-semibold">Sign Up</h1>
        <div>
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
            required
          />
        </div>
        <div>
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
            required
          />
        </div>
        <div>
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
            required
          />
        </div>
        <div>
          <label className="text-white" htmlFor="divisionId">
            Division
          </label>
          <select
            id="divisionId"
            name="divisionId"
            value={formData.divisionId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
          >
            <option disabled>Select Division</option>
            <option value="1">Human Resource</option>
            <option value="2">Technology</option>
            <option value="3">Creative</option>
            <option value="4">Marketing</option>
            <option value="5">Redaksi</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            isLoading={isLoading}
            className="p-3 font-semibold"
          >
            Sign Up
          </Button>
          <p>
            Already have an account?&nbsp;
            <span>
              <Link href={"/sign-in"} className="text-blue-600 underline">
                Click here
              </Link>
            </span>
          </p>
        </div>
      </form>
    </main>
  );
}
