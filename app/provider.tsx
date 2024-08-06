import { NextUIProvider } from "@nextui-org/react";

export function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
