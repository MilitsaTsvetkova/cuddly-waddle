import Image from "next/image";
import Link from "next/link";

interface Props {
  imageUrl: string;
  title: string;
  href?: string;
}
const ProfileLink = ({ imageUrl, title, href }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imageUrl} alt="icon" width={20} height={20} />
      {href ? (
        <Link href={href} className="paragraph-medium text-blue-500">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
