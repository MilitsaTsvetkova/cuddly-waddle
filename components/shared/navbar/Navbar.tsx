import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav
      className="background-light900_dark200 fixed z-50 
    flex w-full justify-between gap-5 p-6 shadow-slate-300 
    dark:shadow-none sm:px-12"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          width={23}
          height={23}
        />
        <p
          className="h2-bold font-spaceGrotesk
         text-gray-300 dark:text-zinc-100 max-sm:hidden"
        >
          Dev <span className="text-zinc-500">OverFlow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex justify-between gap-5">
        <Theme />
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
