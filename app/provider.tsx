import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Provider({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: Session;
}>) {
  return (
    <SessionProvider session={session} refetchInterval={1 * 60}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
