"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session?.user?.verified) router.push("/");

  return (
    <main className="h-full w-11/12 md:w-1/2 flex justify-center items-center my-12 text-neutral-50">
      <div className="w-full space-y-4">
        <h1 className="text-xl font-semibold">Verify Your Account</h1>
        <p>
          Hi {session?.user?.name}, please verify your account to access all
          features. Ask moderator to give access to your Account :{" "}
          {session?.user?.email}.
        </p>
        <p className="font-semibold">
          If this page has not changed after being authorized by the admin,
          please log out and log back in.
        </p>
      </div>
    </main>
  );
}
