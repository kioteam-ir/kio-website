import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  domin
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border  p-4 transition duration-200 hover:shadow-xl border-white/[0.3] bg-gray-900 dark:shadow-none",
        className
      )}>
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="flex items-center gap-x-2">
          {icon}
          <a href={domin} target="_blank" rel="noopener noreferrer" className="text-cyan-500 font-bold">
            Domin Website!
          </a>

        </div>
        <div
          className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div
          className="font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300 line-clamp-2">
          {description}
        </div>
      </div>
    </div>
  );
};