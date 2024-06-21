"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Tickets", href: "/tickets" },
  { label: "Users", href: "/users" },
];

const MainNavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href }) => (
        <Link
          className={`navbar-link ${href === pathname ? "text-primary cursor-default" : ""}`}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
