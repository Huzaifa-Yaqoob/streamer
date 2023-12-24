"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaVideo, FaUser } from "react-icons/fa";
import { Small } from "../typography";

const menuLinks = [
  { name: "Home", icon: FaHome, href: "/user" },
  { name: "Videos", icon: FaVideo, href: "/user/movies" },
  { name: "Profile", icon: FaUser, href: "/user/profile" },
];
export default function Menu(): React.ReactElement {
  const pathname = usePathname();
  return (
    <menu className="flex justify-center items-center p-4 bg-card shadow rounded gap-8 text-card-foreground">
      {menuLinks.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={`flex flex-col items-center gap-2 ${
            pathname === link.href ? "text-primary" : ""
          }`}
        >
          <link.icon className="text-2xl" />
          <Small>{link.name}</Small>
        </Link>
      ))}
    </menu>
  );
}
