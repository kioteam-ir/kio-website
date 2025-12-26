import React from 'react'
import { AnimatedTestimonials } from './ui/animated-testimonials';

export default function GrowthSection() {

    const testimonials = [
        {
          quote:
            "I am a backend developer skilled in Python and Django, passionate about building scalable web applications. Eager to learn, grow, and contribute to real-world projects with clean and efficient code.",
          name: "Yasin Afazel",
          designation: "Back End Developer",
          src: "/dev/yasin.jfif",
        },
        {
          quote:
            "Hello, Just a curious front-end guy crafting cool websites with React, Tailwind & a sprinkle of Aceternity UI magic ✨ Code, coffee, and constant learning...",
          name: "Mohammad Ashrafi",
          designation: "Front End Developer",
          src: "/dev/mamad.jfif",
        },
    ];

  return (
    <div className='2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2'>

      {/* Section Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-500 mb-16 lg:mb-8 mt-10 tracking-tight">
        Developers
      </h2>

      <AnimatedTestimonials testimonials={testimonials} />

    </div>
  )
}






