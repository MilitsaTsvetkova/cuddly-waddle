import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Question } from "../../../components/forms/Question";
import { getUserById } from "../../../lib/actions/user.action";

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser.id)} />
      </div>
    </div>
  );
};

export default page;
