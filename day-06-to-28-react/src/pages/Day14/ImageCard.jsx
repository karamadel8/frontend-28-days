import { Link } from "react-router-dom";

const Imagecard = ({ image }) => {
  return (
    <Link to={`/day-14/${image.id}`}>
      <div>
        <div>
          <div className=" relative group">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0  bg-linear-to-t from-black/70 to-transparent rounded-b-lg m-2  p-1  opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end">
              <p className="text-white text-xs">{image.user.username}</p>
              <p className="text-xs text-orange-300">♥{image.likes}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Imagecard;
