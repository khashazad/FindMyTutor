import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import { Inter as FontSans, Inter } from "next/font/google";
import ThemeProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/header/site-header";

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
      className={cn(
        "min-h-[calc(100vh_-_4rem)] font-sans antialiased",
        fontSans.variable,
      )}
    >
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Toaster position="top-right" />
            <SiteHeader />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
