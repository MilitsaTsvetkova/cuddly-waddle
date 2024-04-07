import Image from "next/image";
import Link from "next/link";
import Tag from "../tag/Tag";

const hotQuestion = [
  {
    id: 1,
    title: "How to create a new project in React?",
  },
  {
    id: 2,
    title: "How to create a new project in React?",
  },
  {
    id: 3,
    title: "How to create a new project in React?",
  },
];

const popularTags = [
  { id: 1, name: "React", totalQuestion: 5 },
  { id: 2, name: "Javascript", totalQuestion: 6 },
  { id: 3, name: "PHP", totalQuestion: 45 },
  { id: 4, name: "Java", totalQuestion: 58 },
  { id: 5, name: "C#", totalQuestion: 34 },
];

const RightSidebar = () => {
  return (
    <section
      className="background-light900_dark200 
        light-border shadow-light-300 
        custom-scrollbar 
        sticky right-0 
        top-0 flex h-screen w-[350px]
        flex-col overflow-y-auto border-l 
        p-6 pt-36 
        dark:shadow-none
        max-xl:hidden
        "
    >
      <div className="flex flex-col">
        <div>
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestion.map((question) => (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
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
                key={tag.id}
                id={tag.id}
                name={tag.name}
                totalQuestion={tag.totalQuestion}
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
