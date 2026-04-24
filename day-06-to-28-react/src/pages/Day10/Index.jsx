import { useState } from "react";
import Recipecard from "./Recipecard";

const Recipefinder = () => {
  const [recipe, setrecipe] = useState([]);
  const [recipename, setrecipename] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const searchrecipe = async () => {
    if (recipename === "") return;
    setloading(true);
    seterror(null);
    setrecipe([]);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipename}`,
      );
      const data = await res.json();
      if (data.meals === null) throw new Error("No Recipes found");
      setrecipe(data.meals);
      setrecipename("");
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-sm w-full border-2 border-gray-200 rounded-xl">
        <div className="bg-blue-800 p-4 text-center mb-3">
          <h1 className="text-2xl text-white font-semibold">
            🍽️ Recipe Finder
          </h1>
          <p className=" text-sm text-gray-200">
            Discover delicious recipes from around the world
          </p>
        </div>
        <div className="flex items-center justify-between p-3   ">
          <input
            type="text"
            placeholder="Search Recipes"
            value={recipename}
            onChange={(e) => setrecipename(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") searchrecipe();
            }}
            className="border border-gray-200 rounded-lg flex-1 p-2 mr-2 focus:border-2 focus:border-amber-600 focus:outline-none"
          />
          <button
            onClick={searchrecipe}
            className="bg-blue-800 text-white text-xs px-4 py-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
          >
            Search
          </button>
        </div>
        {recipe.length === 0 && !loading && !error && (
          <div className="bg-gray-100 text-center p-15 leading-loose">
            <div className="text-5xl mb-2">🍳</div>
            <h2 className="text-lg">Find your next meal</h2>
            <p className="text-gray-400 text-xs">
              Search for chicken, pasta, salad and more...
            </p>
          </div>
        )}
        {error && (
          <div className="text-center bg-red-100 rounded-xl p-6 m-3">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-400 text-xs">
              Please try another recipe name
            </p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {recipe.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-3 bg-gray-100">
            {recipe.map((meal) => (
              <Recipecard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipefinder;
