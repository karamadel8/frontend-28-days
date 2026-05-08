import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Imagedetails = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [image, setimage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const imagedetails = async () => {
      setloading(true);
      seterror(null);
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=Gj-lnccGKKOzaOqKD7BmBQol0X85D2xRdfHmI5e3ing`,
        );
        const data = await res.json();
        if (data === null) throw new Error("image not found");
        setimage(data);
      } catch (err) {
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };
    imagedetails();
  }, [id]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg border border-gray-50">
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
              please search for another image
            </p>
          </div>
        )}
        {image && (
          <div className="">
            <div className="relative mb-2 ">
              <img
                src={image.urls.full}
                alt=""
                className="rounded-t-2xl w-full object-cover h-64"
              />
              <button
                className="absolute top-1 left-1 m-2 text-sm  cursor-pointer bg-black/70 text-white px-4 py-1 border border-black/70 rounded-lg shadow-xl transition-colors duration-200 hover:bg-amber-100 hover:text-blue-900 "
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 ">
                <img
                  src={image.user.profile_image.small}
                  alt={image.portfolio_url}
                  className="w-12 h-12 rounded-full"
                />
                <div className="p-1">
                  <p className="text-xl">{image.user.name}</p>
                  <p className="text-xs">@{image.user.username}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex-1 bg-gray-200 border border-gray-200 rounded-lg p-2 text-center shadow-md">
                  <p className="text-sm font-bold text-blue-800/90">
                    {(Number(image.likes) / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-gray-400">likes</p>
                </div>
                <div className="flex-1 bg-gray-200 border border-gray-200 rounded-lg p-2 text-center shadow-md">
                  <p className="text-sm font-bold text-blue-800/90">
                    {Number(image.downloads / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-gray-400">Downloads</p>
                </div>
                <div className="flex-1 bg-gray-200 border border-gray-200 rounded-lg p-2 text-center shadow-md">
                  <p className="text-sm font-bold text-blue-800/90">
                    {Number(image.views / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-gray-400 ">views</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-mono mb-2">
                {image.description || image.alt_description || "No description"}
              </p>
              <div className="w-full bg-blue-800 p-2 text-center rounded-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-200 cursor-pointer hover:translate-x-2">
                <a
                  className="text-white text-sm "
                  href={image.links.download}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ⬇️ Download Photo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Imagedetails;
