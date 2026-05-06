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
          Go to Day 06
        </Link>
      </div>
      <div>
        <Link to="/day-07" className="text-blue-500 hover:underline">
          Go to Day 07
        </Link>
      </div>
      <div>
        <Link to="/day-08" className="text-blue-500 hover:underline">
          Go to Day 08
        </Link>
      </div>
      <div>
        <Link to="/day-09" className="text-blue-500 hover:underline">
          Go to Day 09
        </Link>
      </div>
      <div>
        <Link to="/day-10" className="text-blue-500 hover:underline">
          Go to Day 10
        </Link>
      </div>
      <div>
        <Link to="/day-11" className="text-blue-500 hover:underline">
          Go to Day 11
        </Link>
      </div>
      <div>
        <Link to="/day-12" className="text-blue-500 hover:underline">
          Go to Day 12
        </Link>
      </div>
      <div>
        <Link to="/day-13" className="text-blue-500 hover:underline">
          Go to Day 13
        </Link>
      </div>
    </div>
  );
}

export default Home;
