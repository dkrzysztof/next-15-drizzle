export type PageHeaderProps = {
  title: string;
  name: string;
};

export const PageHeader = ({ title, name }: PageHeaderProps) => {
  return (
    <div className="w-full flex items-baseline text-left justify-start mb-10">
      <h1 className="text-6xl text-slate-100 font-extrabold mr-3">{title}</h1>
      <p className="text-md text-slate-400 font-light">{" | "}{name}</p>
    </div>
  );
};
