"use client";
import React from 'react'
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";


export default function Resumes() {

  return (
    <div className='2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2'>
        <h2 className="max-w-7xl text-cyan-500 text-center pl-4 mx-auto text-3xl md:text-5xl font-bold font-sans">
          Projects
        </h2>

        <BentoGrid className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto mt-20 md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
              domin={item.domin} />
          ))}
        </BentoGrid>

    </div>
  )
}

const Skeleton = ({ img }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl border border-white/[0.2] bg-gray-900">
    <img src={img} alt="loan-project" className="w-full h-full rounded-2xl" />
  </div>
);

const items = [
  {
    title: "Website: Personal Bank or Family Bank",
    description: "Developed a full personal banking system UI with React.js, TailwindCSS, SQLite, and Django. Built responsive dashboards (admin & user), integrated APIs with JWT authentication, and implemented protected routes.",
    header: <Skeleton img="/projects/loan.png" />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    domin: "https://sandoghbisod.ir/"
  },
  {
    title: "Website: Velvet Pour",
    description: "Created a practice project with React, GSAP, and TailwindCSS to showcase cocktails and club atmosphere. Focused on smooth animations, responsive design, and visually engaging product presentation.",
    header: <Skeleton img="/projects/velvet-pour.png" />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    domin: "https://ashrafi-frontdeveloper.github.io/gsap-cocktail/"
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton img="/projects/backend.png" />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    domin: "*"
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton img="/projects/backend-developer-.jpg.webp" />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    domin: "*"
  },
];