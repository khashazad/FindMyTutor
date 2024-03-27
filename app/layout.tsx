import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import { Inter as FontSans, Inter } from "next/font/google";
import ThemeProvider from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Find My tutor",
  description: "An app build to find desired tutors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
    >
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
