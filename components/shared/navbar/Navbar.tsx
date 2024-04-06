import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="background-light900_dark200 fixed z-50 
    flex w-full justify-between gap-5 p-6 shadow-light-300 
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
         text-dark-100 dark:text-light-900 max-sm:hidden"
        >
          Dev <span className="text-primary-500">OverFlow</span>
        </p>
      </Link>
      <div className="flex justify-between gap-5">
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
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
