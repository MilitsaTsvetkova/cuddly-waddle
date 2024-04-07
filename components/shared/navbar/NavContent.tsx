"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../../../constants";
import { SheetClose } from "../../ui/sheet";

const NavContent = () => {
  const path = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link, index) => {
        const isActive =
          (path.includes(link.route) && link.route.length > 1) ||
          path === link.route;
        return (
          <SheetClose key={index} asChild>
            <Link
              href={link.route}
              className={`${isActive ? "primary-gradient rounded-lg text-gray-900" : "text-dark300_light900"} 
              flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default NavContent;
