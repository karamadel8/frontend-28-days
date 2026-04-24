import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Recipedetails = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [meal, setmeal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const getingredient = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient} `);
      }
    }
    return ingredients;
  };
  useEffect(() => {
    const recipedetails = async () => {
      setloading(true);
      seterror(null);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await res.json();
        if (data.meals === null) throw new Error("meal not found");
        setmeal(data.meals[0]);
      } catch (err) {
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };
    recipedetails();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full border-2 border-gray-200 rounded-xl">
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
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
        {meal && (
          <div>
            <div className="relative">
              <button
                className="absolute top-1 left-1  cursor-pointer bg-gray-200 text-blue-800 px-3 py-1 border border-gray-200 rounded-full shadow-xl transition-colors duration-200 hover:bg-amber-200 "
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </div>
            <div className="p-2 mb-2">
              <h1 className="text-xl font-semibold">{meal.strMeal}</h1>
              <span className="text-xs border bg-blue-300 border-blue-300 px-2 py-1 text-blue-800 rounded-full mr-2">
                {meal.strCategory}
              </span>
              <span className="text-xs border bg-blue-300 border-blue-300 px-2 py-1 text-blue-800 rounded-full ">
                {meal.strArea}
              </span>
            </div>
            <div className="p-2">
              <h2 className="font-semibold border-b border-b-gray-200 mb-2 leading-loose">
                Ingredients
              </h2>
              <ul className="list-disc list-inside">
                {getingredient(meal).map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-500 border-b border-b-gray-200 mb-1 leading-loose  "
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-2">
              <h2 className="font-semibold border-b border-b-gray-200 mb-2 leading-loose">
                Instructions
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {meal.strInstructions}
              </p>
            </div>
            <div className="text-center bg-red-600 p-2 m-3 cursor-pointer border border-red-600 rounded-xl transition-all duration-200 text-sm hover:bg-red-500 hover:shadow-xl hover:-translate-y-0.5 hover:translate-x-0.5 ">
              <a href={meal.strYoutube} target="_blank" className="text-white ">
                ▶ Watch on YouTube
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipedetails;
