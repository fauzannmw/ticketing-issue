"use client";
import { auth } from "@/lib/auth";
import { logoutSession } from "@/server/auth_action";
import { useSession } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <form
      // action={logoutSession}
      className="h-screen w-screen flex flex-col justify-center items-center gap-10"
    >
      <div>
        {/* <p className="text-white">{session?.user?.name}</p>
        <p className="text-white">{session?.user?.email}</p> */}
      </div>
      <button type="submit" className="w-40">
        logoutSession
      </button>
    </form>
  );
}
