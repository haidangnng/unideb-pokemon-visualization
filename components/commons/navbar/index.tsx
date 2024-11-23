"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Menu = {
  label: string;
  href: string;
};
const menus: Menu[] = [
  { label: "Statistics", href: "/statistics" },
  { label: "Pokemons", href: "/pokemons" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const isCurrentPath = useCallback(
    (href: string) => {
      return (
        href === pathname ||
        (pathname.includes("pokemons") && href !== "/statistics")
      );
    },
    [pathname],
  );

  return (
    <nav className="flex w-full border-2 min-h-10 justify-between items-center gap-8 p-2 px-4 box-border rounded-md shadow-black">
      <h1 className="uppercase text-4xl">visudex</h1>
      <div className="flex gap-8">
        {menus.map((menu) => (
          <Link
            className={cn("text-xl text-gray-400", {
              "text-primary underline underline-offset-4": isCurrentPath(
                menu.href,
              ),
            })}
            href={menu.href}
            key={menu.label}
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
