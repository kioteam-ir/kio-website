"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/Infinite-moving-cards";

export default function Techs() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    title: "HTML5",
    icon: "/Icon/icons8-html-96.png",
  },
  {
    title: "CSS3",
    icon: "/Icon/icons8-css-96.png",
  },
  {
    title: "Docker",
    icon: "/Icon/icons8-docker-logo-96.png",
  },
  {
    title: "Javascript",
    icon: "/Icon/icons8-javascript-96.png",
  },
  {
    title: "React",
    icon: "/Icon/icons8-react-96.png",
  },
  {
    title: "Linux",
    icon: "/Icon/icons8-linux-96.png",
  },
  {
    title: "Tailwind",
    icon: "/Icon/icons8-tailwindcss-96.png",
  },
  {
    title: "Bootstrap",
    icon: "/Icon/icons8-bootstrap-96.png",
  },
  {
    title: "Django",
    icon: "/Icon/icons8-django-96.png",
  },
  {
    title: "Git",
    icon: "/Icon/icons8-git-96.png",
  },
  {
    title: "Python",
    icon: "/Icon/icons8-python-96.png",
  },
];
