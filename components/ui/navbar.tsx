// @/components/ui/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const NavbarUi: React.FC = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      return;
    }
  }, [session]);

  const handleLogin = () => {
    signIn();
  };
  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="w-11/12 md:w-1/2 h-fit min-h-12 md:min-h-16 flex justify-around items-center sticky top-4 md:top-4 md:px-4 md:text-lg font-semibold border-2 border-white shadow-xl rounded-md">
      <Link
        href={"/"}
        className={`${currentPath === "/" ? "underline" : "no-underline"} 
          text-white hover:opacity-75 transition duration-500`}
      >
        Ticket List
      </Link>
      {session?.user?.role == "moderator" && (
        <Link
          href={"/ticket-progress"}
          className={`${
            currentPath === "/ticket-progress" ? "underline" : "no-underline"
          } 
          text-white hover:opacity-75 transition duration-500`}
        >
          Ticket Progress
        </Link>
      )}

      <Link
        href={"/ticket-form"}
        className={`${
          currentPath === "/ticket-form" ? "underline" : "no-underline"
        } 
             text-white hover:opacity-75 transition duration-500`}
      >
        Add Ticket
      </Link>
      {session?.user ? (
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-white border-2 border-white rounded-md hover:text-neutral-300 hover:bg-neutral-800 transition duration-500"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="px-3 py-1 text-white border-2 border-white rounded-md hover:text-neutral-300 hover:bg-neutral-800 transition duration-500"
        >
          Login
        </button>
      )}
    </nav>
  );
};
