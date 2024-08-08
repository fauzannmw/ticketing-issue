"use client";

import { loginByCredential } from "@/server/auth_action";
import { useFormState } from "react-dom";

const loginInitialState = {
  message: "",
  errors: {
    email: "",
    password: "",
    credentials: "",
    unknown: "",
  },
};

const Form = () => {
  const [formState, formAction] = useFormState(
    loginByCredential,
    loginInitialState
  );

  return (
    <main className="h-full w-full max-w-3xl flex justify-center items-center my-12 text-neutral-50">
      <form className="w-full h-full mt-8 space-y-6" action={formAction}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              placeholder="Email address"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
};

export default Form;
