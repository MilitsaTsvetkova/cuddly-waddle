import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      {" "}
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Home;
