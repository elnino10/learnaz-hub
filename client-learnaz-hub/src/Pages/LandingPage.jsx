// eslint-disable-next-line no-unused-vars
import React from "react";
import Learn from "../assets/landingImg.png";

function LandingPage() {
  return (
    <div className="m-0 p-0 bg-blue-100 min-h-screen scro">
      {/* Navigation Bar */}
      <nav className="h-20 bg-white p-6 pr-8 shadow-md flex justify-between fixed w-full">
        {/* Logo */}
        <div className="text-xl font-bold">Learnaz-Hub</div>
        {/* course category */}
        <div className="text-lg text-gray-600 hover:text-gray-900">Courses</div>
        {/* Search Box */}
        <div className="relative w-80%">
          <input
            type="text"
            className="bg-blue-100 border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
            placeholder="Search courses"
          />
          {/* <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.5 10.5a7.5 7.5 0 010 10.5z"
            ></path>
          </svg> */}
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-lg text-gray-600 hover:text-gray-900">
              Learn more
            </a>
          </li>
          <li>
            <a href="#" className="text-lg text-gray-600 hover:text-gray-900">
              Become a Creator
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg border p-2 bg-black text-white hover:text-gray-900"
            >
              Log In
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg border p-2 bg-black text-white hover:text-gray-900"
            >
              Sign Up
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex items-center justify-center">
        {/* Illustration */}
        {/* Text Content */}
        <div className="p-8 flex justify-between w-full">
          <div className="pt-10 flex items-center">
            <img
              src={Learn}
              className="w-1/2 mr-6 object-cover"
              alt="Learning Online"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4 mt-20">One Skill At time</h1>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Get started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
