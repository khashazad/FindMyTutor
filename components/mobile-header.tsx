"use client";
import Link from "next/link";

import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Menu } from "lucide-react";

export default function MobileHeader() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Image
              src={Logo}
              alt="logo"
              quality={95}
              height={100}
              width={100}
            />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Browse Tutors
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            My Session
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
