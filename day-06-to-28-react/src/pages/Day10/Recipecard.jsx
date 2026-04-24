import { Link } from "react-router-dom";

const Recipecard = ({ meal }) => {
  return (
    <Link to={`/day-10/${meal.idMeal}`}>
      <div className="border rounded-xl border-gray-200  bg-white">
        <div className="">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-32 object-cover rounded-t-xl"
          />
        </div>
        <div className="p-2">
          <h2 className="text-sm font-semibold mb-1 line-clamp-2 ">
            {meal.strMeal}
          </h2>
          <span className="text-xs bg-gray-200 border border-gray-200 rounded-lg p-1 mr-2">
            {meal.strCategory}
          </span>
          <span className="text-xs bg-gray-200 border border-gray-200 rounded-lg p-1 ">
            {meal.strArea}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Recipecard;
