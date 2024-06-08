import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Question } from "../../../components/forms/Question";
import { getUserById } from "../../../lib/actions/user.action";

export const metadata: Metadata = {
  title: "Ask a Question | Dev Overflow",
  description: "Ask a Question Page",
};

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
