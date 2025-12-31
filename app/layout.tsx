import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Modal from "@/components/Modal";
import Header from "@/components/Header";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "REST Countries Explorer",
  description: "Explore countries around the world with detailed information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <ThemeProvider>
          <ModalProvider>
            <div className="min-h-screen flex flex-col">
              <Header />

              {/* Main content */}
              <main className="flex-1 px-4 lg:px-8 py-8">{children}</main>
            </div>

            {/* Global Modal */}
            <Modal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
