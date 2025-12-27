import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
      <section className="min-h-screen bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm flex flex-col items-center justify-center text-center">
                  <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">404</h1>
                  <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Something's missing.</p>
                  <p className="mb-4 text-lg font-light text-white">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                  <img src="/404-computer.svg" alt="NotFound" className="" />
                  <Link to="/" className="inline-flex text-white hover:underline bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-2xl px-5 text-center dark:focus:ring-primary-900">Back to Homepage</Link>
              </div>   
          </div>
      </section>
  )
}