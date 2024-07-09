import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="h-20 bg-white p-6 shadow-md top-0 z-20 fixed w-full">
        <nav className="flex justify-between fixed w-full pr-8">
          {/* Logo */}
          <Link to="/">
            <div className="text-xl font-bold">Learnaz-Hub</div>
          </Link>
          {/* course category */}
          <div className="pl-6 text-lg text-gray-600 hover:text-gray-900">
            Courses
          </div>
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
            <Link
              to="/login"
              className={`border p-2 text-lg transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={`border p-2 text-lg transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300`}
            >
              Sign Up
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
