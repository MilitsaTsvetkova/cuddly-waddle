import Image from "next/image";
import Link from "next/link";
import { getHotQuestions } from "../../../lib/actions/question.action";
import { getTopPopularTags } from "../../../lib/actions/tag.action";
import Tag from "../tag/Tag";

const RightSidebar = async () => {
  const { hotQuestions } = await getHotQuestions();
  const { popularTags } = await getTopPopularTags();

  return (
    <section
      className="background-light900_dark200 
        light-border custom-scrollbar 
        sticky 
        right-0 top-0 
        flex h-screen w-[350px] flex-col
        overflow-y-auto border-l p-6 
        pt-36 shadow-gray-300 
        dark:shadow-none
        max-xl:hidden
        "
    >
      <div className="flex flex-col">
        <div>
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestions.map((question) => (
              <Link
                key={question.id}
                href={`/question/${question.id}`}
                className="flex cursor-pointer items-center justify-between gap-7 "
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron-right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map((tag) => (
              <Tag
                key={tag._id}
                id={tag._id}
                name={tag.name}
                totalQuestion={tag.numberOfQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
