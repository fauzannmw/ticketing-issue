import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Provider } from "@/app/provider";
import { Toaster } from "sonner";
import { NavbarUi } from "@/components/ui/navbar";

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
      <body className={`${inter.className} bg-neutral-900`}>
        <Provider>
          <main className="min-h-screen w-full flex flex-col items-center font-mono">
            <NavbarUi />
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}
