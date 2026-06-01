import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Frontend 28 Days Challenge
      </h1>
      <p className="text-gray-500">Days 06-28 built with React + Tailwind</p>
      <div>
        <Link to="/day-06" className="text-blue-500 hover:underline">
          Day 06 - Counter App
        </Link>
      </div>
      <div>
        <Link to="/day-07" className="text-blue-500 hover:underline">
          Day 07 - GitHub Finder
        </Link>
      </div>
      <div>
        <Link to="/day-08" className="text-blue-500 hover:underline">
          Day 08 - Weather App
        </Link>
      </div>
      <div>
        <Link to="/day-09" className="text-blue-500 hover:underline">
          Day 09 - Password Generator
        </Link>
      </div>
      <div>
        <Link to="/day-10" className="text-blue-500 hover:underline">
          Day 10 - Recipe Finder
        </Link>
      </div>
      <div>
        <Link to="/day-11" className="text-blue-500 hover:underline">
          Day 11 - Quiz App
        </Link>
      </div>
      <div>
        <Link to="/day-12" className="text-blue-500 hover:underline">
          Day 12 - Budget Tracker
        </Link>
      </div>
      <div>
        <Link to="/day-13" className="text-blue-500 hover:underline">
          Day 13 - Markdown Previewer
        </Link>
      </div>
      <div>
        <Link to="/day-14" className="text-blue-500 hover:underline">
          Day 14 - Image search
        </Link>
      </div>
      <div>
        <Link to="/day-15" className="text-blue-500 hover:underline">
          Day 15 - Movie search
        </Link>
      </div>
      <div>
        <Link to="/day-16" className="text-blue-500 hover:underline">
          Day 16 - Expenses Tracker
        </Link>
      </div>
    </div>
  );
}

export default Home;
