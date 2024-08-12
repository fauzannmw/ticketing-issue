"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    divisionId: 1,
  });

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
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // alkdjaslkdsl
        //  
        router.push("/sign-in"); // redirect to login after successful registration
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <main className="h-full w-full max-w-3xl flex justify-center items-center my-12 text-neutral-50">
      <form onSubmit={handleSubmit} className="w-full space-y-4 text-black">
        <div>
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option disabled>Select Division</option>
            <option value="1">Technology</option>
            <option value="2">Human Resource</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Register
        </button>
      </form>
    </main>
  );
}
