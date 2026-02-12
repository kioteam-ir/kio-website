"use client";

import React from "react";

export default function ContactForm() {

  return (
    <section className="py-20 lg:py-28 bg-gray-900">
      <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500 mb-4">
          Let's Bring Your Idea to Life
        </h2>
        <p className="text-center text-neutral-400 text-base md:text-lg mb-16 max-w-3xl mx-auto">
          Tell us about your project and we'll get back to you with a plan.
        </p>


        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="flex justify-center lg:justify-end">
            <img src="/person-playing-3d-video-games-device.png" alt="" className="w-full h-full rounded-2xl bg-gray-900" />
          </div>


          <div className="space-y-3">
            <form className="space-y-3">

              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  className="w-full px-5 py-2 bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="e.g. E-commerce Platform"
                />
              </div>


              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Type
                </label>
                <input
                  id="projectType"
                  type="text"
                  className="w-full px-5 py-2 bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="e.g. E-commerce , Shopping , News"
                />
              </div>
              
              {/* <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  className="w-full px-5 py-2 bg-gray-900 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="">Select a type</option>
                  <option value="web-app">Web Application</option>
                  <option value="landing">Landing Page</option>
                  <option value="dashboard">Dashboard / Admin Panel</option>
                  <option value="other">Other</option>
                </select>
              </div> */}

              {/* <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-neutral-300 mb-2">
                  Preferred Developer (Optional)
                </label>
                <select
                  id="assignee"
                  className="w-full px-5 py-2 bg-gray-900 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="">Any available developer</option>
                  <option value="you">You (Frontend Specialist)</option>
                  <option value="friend">Your Partner (Backend Specialist)</option>
                  <option value="both">Both of us</option>
                </select>
              </div> */}

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  className="w-full px-5 py-2 bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="Tell us about your vision, features, timeline, budget range..."
                />
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Submit Project Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}