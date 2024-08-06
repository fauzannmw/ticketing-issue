import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import NavbarUi from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticketing Issue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="min-h-screen w-full flex flex-col items-center bg-neutral-900 font-mono">
            <NavbarUi />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
