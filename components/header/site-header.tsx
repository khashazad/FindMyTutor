"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/public/logo.png";
import Image from "next/image";
import MobileHeader from "./mobile-header";
import UserNav from "./user-nav";
import { useSession } from "next-auth/react";

export default function SiteHeader() {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  return (
    <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6">
      {!isAuthenticated ? (
        <h1>Welcome to Find My Tutor</h1>
      ) : (
        <div>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="relative flex items-center gap-2 text-lg font-semibold md:text-base object-contain "
            >
              <Image
                src={Logo}
                alt="logo"
                quality={95}
                height={80}
                width={80}
              />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse Tutors
            </Link>
          </nav>
          <MobileHeader />
        </div>
      )}
      <div className="flex gap-4 items-center">
        {isAuthenticated && <UserNav />}
        <ThemeToggle />
      </div>
    </header>
  );
}
