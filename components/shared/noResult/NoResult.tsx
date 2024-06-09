import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

interface Props {
  title: string;
  description?: string;
  link?: string;
  linkTitle?: string;
}
const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      {description && (
        <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
          {description}
        </p>
      )}
      {link && linkTitle && (
        <Link href={link}>
          <Button className="paragraph-medium primary-gradient hover:primary-gradient dark:primary-gradient mt-5 min-h-[46px] rounded-lg px-4 py-3 text-gray-100 dark:text-gray-100">
            {linkTitle}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NoResult;
