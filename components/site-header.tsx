import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
import MobileHeader from "./mobile-header";

export default function SiteHeader() {
  const session = getServerSession(authOptions);

  return (
    <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6">
      {!session ? (
        <h1>Welcome to Find My Tutor</h1>
      ) : (
        <div>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
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
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              My Sessions
            </Link>
          </nav>
          <MobileHeader />
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
