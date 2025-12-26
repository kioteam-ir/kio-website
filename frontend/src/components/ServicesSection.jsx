// "use client";;
// import React from "react";
// import { LinkPreview } from "./ui/link-preview";


// export default function ServicesSection() {
//   return (
//     <div className='2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2'>
//       <div className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-500 shadow-2xl p-1.5">Our Services</div>

//       <div className="flex justify-center items-center mt-10 flex-col px-4">
//         <p
//           className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
//           <LinkPreview url="https://tailwindcss.com" className="font-bold">
//             Tailwind CSS
//           </LinkPreview>{" "}
//           and{" "}
//           <LinkPreview url="https://framer.com/motion" className="font-bold">
//             Framer Motion
//           </LinkPreview>{" "}
//           are a great way to build modern websites.
//         </p>
//         <p
//           className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
//           Visit{" "}
//           <LinkPreview
//             url="https://ui.aceternity.com"
//             className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500">
//             Aceternity UI
//           </LinkPreview>{" "}
//           for amazing Tailwind and Framer Motion components.
//         </p>
//       </div>


//     </div>
//   )
// }
"use client";

import React from "react";
import { LinkPreview } from "./ui/link-preview";

export default function ServicesSection() {
  return (
      <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2">
        {/* Section Title */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-500 mb-16 lg:mb-16 tracking-tight">
          Our Services
        </h2>

        {/* Services Grid */}
        <div className="flex flex-col gap-4 lg:gap-10 max-w-5xl px-2 mx-auto">
          {/* Service 1: Modern Frontend */}
          <div className="group space-y-2">
            <p className="text-neutral-300 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
              Modern, responsive web application development using{" "}
              <LinkPreview
                url="https://react.dev"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                React
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview
                url="https://tailwindcss.com"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Tailwind CSS
              </LinkPreview>
              .
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
              We leverage advanced 
              <LinkPreview 
                url="https://motion.dev"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">{" "} Framer Motion {" "}
              </LinkPreview> 
              animations and professional 
              <LinkPreview url="https://ui.aceternity.com" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
              {" "}  Acernity UI {" "}
              </LinkPreview> components to deliver a world-class user experience.
            </p>
          </div>

          {/* Service 2: Powerful Backend */}
          <div className="group space-y-2">
            <p className="text-neutral-300 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
              Robust, secure, and scalable backend development with{" "}
              <LinkPreview
                url="https://www.djangoproject.com"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Django
              </LinkPreview>{" "}
              and {" "} 
              <LinkPreview
                url="https://www.python.org"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                Python.
              </LinkPreview>
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
              Professional REST APIs, secure JWT authentication, custom admin panels, and infrastructure ready for rapid business growth.
            </p>
          </div>

          {/* Service 3: Custom Dashboards */}
          <div className="group space-y-2">
            <p className="text-neutral-300 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
              Design and development of custom dashboards and advanced admin panels.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
              Full control over your data, real-time analytics, beautiful and efficient UI — tailored precisely to your business needs.
            </p>
          </div>

          {/* Service 4: Landing Pages & Portfolios */}
          <div className="group space-y-2">
            <p className="text-neutral-300 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
              High-converting landing pages and stunning portfolio websites.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
              Websites that not only attract clients but also serve as living showcases of our expertise — just like the one you're viewing right now.
            </p>
          </div>
        </div>
      </div>
  );
}