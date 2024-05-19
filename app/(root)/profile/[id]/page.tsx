import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import AnswerTab from "../../../../components/shared/answerTab/AnswerTab";
import ProfileLink from "../../../../components/shared/profileLink/ProfileLink";
import QuestionTab from "../../../../components/shared/questionTab/QuestionTab";
import Stats from "../../../../components/shared/stats/Stats";
import { Button } from "../../../../components/ui/button";
import { getUserInfo } from "../../../../lib/actions/user.action";
import { getJoinedDate } from "../../../../lib/dates";
import { URLProps } from "../../../../types";

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const { user, totalAnswers, totalQuestions } = await getUserInfo({
    userId: params.id,
  });
  return (
    <>
      <div
        className="flex flex-col-reverse 
      items-start justify-between sm:flex-row"
      >
        <div className="flex flex-col items-start lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imageUrl="/assets/icons/link.svg"
                  title="Portfolio"
                  href={user.portfolioWebsite}
                />
              )}
              {user.location && (
                <ProfileLink
                  imageUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}
              <ProfileLink
                imageUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
            </div>
            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="max-sm:w-fullsm:mt-3 flex justify-end max-sm:mb-5">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats totalQuestions={totalQuestions} totalAnswers={totalAnswers} />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col">
            <AnswerTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
