"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/public/logo.png";
import Image from "next/image";
import MobileHeader from "./mobile-header";
import UserNav from "./user-nav";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Roles } from "@/lib/types/types";

export default function SiteHeader() {
  const { status, data: session } = useSession();

  const isAuthenticated = status === "authenticated";

  const isTutor = Number(session?.user.role) == Roles.TUTOR;

  return (
    <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6">
      {!isAuthenticated ? (
        <div className="flex gap-2 md:gap-4 items-center">
          <h1>Welcome to Find My Tutor</h1>

          <Link href="/auth/login">
            <Button>Get Started</Button>
          </Link>
        </div>
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
            {isTutor ? (
              <div>
                <Link
                  href="/sessions"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sessions
                </Link>
              </div>
            ) : (
              <div className="flex gap-8">
                <Link
                  href="/tutors"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Browse Tutors
                </Link>
                <Link
                  href="/my-sessions"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  My Sessions
                </Link>
              </div>
            )}
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
