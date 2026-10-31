"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";

import ThemeToggle from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "./ui/button";

export default function MobileNavigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center gap-x-3">
      <ThemeToggle />

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="py-5.5">
            <SheetTitle>Site Navigation</SheetTitle>
          </SheetHeader>
          <ul className="px-4 flex flex-col gap-y-2">
            <li>
              <Link
                href="/projects"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                onClick={() => setIsMobileOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                onClick={() => setIsMobileOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                onClick={() => setIsMobileOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
