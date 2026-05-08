import { useEffect, useState } from "react";
import Imagecard from "./ImageCard";
import Masonry from "react-masonry-css";

const Imagesearch = () => {
  const [query, setquery] = useState("");
  const [images, setimages] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const imagefetch = async () => {
    if (query === "") return;
    setloading(true);
    seterror(null);
    setimages([]);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=Gj-lnccGKKOzaOqKD7BmBQol0X85D2xRdfHmI5e3ing`,
      );
      const data = await res.json();
      if (!data.results || data.results.length === 0)
        throw new Error("no photos found !");
      setimages(data.results);
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (query === "") return;
    imagefetch();
  }, [page]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg border border-gray-50">
        <div className="bg-blue-800  text-center p-4 rounded-t-2xl mb-2">
          <h1 className="text-2xl text-white">🔍 Image Search</h1>
          <p className="text-sm text-gray-300">
            Search millions of beautiful photos
          </p>
        </div>
        <div className="flex items-center justify-between p-2">
          <input
            type="text"
            value={query}
            className="border border-gray-200 bg-gray-100 rounded-lg flex-1 p-2 mr-2 focus:border-2 focus:border-blue-700 focus:outline-none"
            placeholder="Search images"
            onChange={(e) => setquery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setpage(1);
                imagefetch();
              }
            }}
          />
          <button
            className="bg-blue-800 text-white text-xs px-4 py-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
            onClick={() => {
              setpage(1);
              imagefetch();
            }}
          >
            Search
          </button>
        </div>
        {images.length === 0 && !loading && !error && (
          <div className="text-center p-22  text-sm bg-gray-100 mb-36">
            <p className="text-3xl mb-2">🖼️</p>
            <p className="text-lg mb-2">Search for images</p>
            <p className="text-xs text-gray-400">
              Try "nature", "city", "food", "travel"...
            </p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center bg-red-100 rounded-xl p-6 m-3">
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-400 text-xs">
              Please Search for different image...
            </p>
          </div>
        )}
        {images.length > 0 && (
          <div className="bg-gray-100">
            <p className="border-t border-b p-2 text-sm text-gray-500 mb-2 border-gray-300">{`Results for "${query}"`}</p>
            <Masonry
              breakpointCols={{ default: 3, 768: 2, 500: 1 }}
              className="flex gap-4 border-b border-gray-300 mb-2 p-2 "
              columnClassName="flex flex-col gap-4"
            >
              {images.map((image) => (
                <Imagecard key={image.id} image={image} />
              ))}
            </Masonry>
            <div className="flex items-center justify-center gap-4 p-2 m-2">
              <button
                className="border border-gray-300 bg-gray-200 rounded-lg px-3 py-0.5 text-sm cursor-pointer active:bg-blue-800 active:text-white hover:bg-gray-300 "
                onClick={() => {
                  setpage(page - 1);
                }}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="text-sm text-gray-500">Page {page}</span>
              <button
                className="border border-gray-300 bg-gray-200 rounded-lg px-3 py-0.5 text-sm cursor-pointer active:bg-blue-800 active:text-white hover:bg-gray-300 "
                onClick={() => setpage(page + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Imagesearch;
