import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

export type PageHeaderProps = {
  title: string;
  name: string;
  backLink?: string;
  backLinkName?: string;
};

export const PageHeader = ({
  title,
  name,
  backLink,
  backLinkName,
}: PageHeaderProps) => {
  return (
    <div className="w-full flex flex-col items-baseline text-left justify-start">
      {backLink ? (
        <div className="flex text-md text-slate-400 font-light mb-1 pb-2">
          <Link href={backLink}>
            <ArrowLeftOutlined /> {backLinkName ?? backLink}
          </Link>
        </div>
      ) : null}
      <div className="w-full flex items-baseline text-left justify-start mb-10">
        <h1 className="text-6xl text-slate-100 font-extrabold mr-3">{title}</h1>
        <p className="text-md text-slate-400 font-light">
          {" | "}
          {name}
        </p>
      </div>
    </div>
  );
};
