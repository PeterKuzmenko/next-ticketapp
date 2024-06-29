"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "@prisma/client";

const links = [
  { label: "Dashboard", href: "/", adminOnly: false },
  { label: "Tickets", href: "/tickets", adminOnly: false },
  { label: "Users", href: "/users", adminOnly: true },
];

interface Props {
  role?: Role;
}

const MainNavLinks = ({ role }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => role === Role.ADMIN || !link.adminOnly)
        .map(({ label, href }) => {
          const active = href.split("/")[1] === pathname.split("/")[1];

          return (
            <Link
              key={href}
              className={`navbar-link ${active ? "text-primary cursor-default" : ""}`}
              href={href}
            >
              {label}
            </Link>
          );
        })}
    </div>
  );
};

export default MainNavLinks;
