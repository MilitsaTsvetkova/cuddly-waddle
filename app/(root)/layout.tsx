import { ReactNode } from "react";
import LeftSidebar from "../../components/shared/leftSidebar/LeftSidebar";
import Navbar from "../../components/shared/navbar/Navbar";
import RightSidebar from "../../components/shared/rightSidebar/RightSidebar";
import { Toaster } from "../../components/ui/toaster";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light900_dark200 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section
          className="flex min-h-screen 
        flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14"
        >
          <div className="mx-auto w-full">{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};

export default layout;
