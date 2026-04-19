import { useState } from "react";

const Day07 = () => {
  const [user, setuser] = useState(null);
  const [repos, setrepos] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [username, setusername] = useState("");
  const fetchUSer = async () => {
    if (username === "") return;
    setloading(true);
    setuser(null);
    seterror(null);
    setrepos([]);
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User Not Found !");
      const data = await res.json();
      setuser(data);
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`,
      );
      const reposResData = await reposRes.json();
      setrepos(reposResData);
      setusername("");
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen max-w-sm w-full bg-gray-100 mx-auto rounded-2xl p-6 ">
      <div className="bg-blue-800  rounded-2xl p-6 mb-4 text-center">
        <h1 className="text-white font-semibold text-xl">GitHub Finder</h1>
        <p className="text-gray-300 text-sm font-semibold mt-1">
          Search any GitHub user
        </p>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          placeholder="Please type Username"
          onChange={(e) => setusername(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") fetchUSer();
          }}
          className="flex-1 border-2 p-3 border-gray-300 rounded-xl font-semibold"
        />
        <button
          onClick={fetchUSer}
          className="bg-blue-800 text-white py-3 px-5 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition duration-200 "
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-10">
          <div className="w-8 h-8 border-4 border-blue-800 rounded-full border-t-transparent animate-spin "></div>
        </div>
      )}
      {error && (
        <div className="text-center bg-red-100 rounded-2xl p-4">
          <p className="text-red-600 font-semibold">{error}</p>
          <p className="text-red-500 text-sm">
            Please check the username and try again
          </p>
        </div>
      )}
      {user && (
        <div className="bg-white p-6 rounded-2xl">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-18 h-18 rounded-full mr-2"
              />
              <div>
                <h2 className=" font-semibold ">{user.name}</h2>
                <p className="text-blue-500 text-sm  font-semibold">
                  @{user.login}
                </p>
              </div>
            </div>

            <p className="text-gray-500 tracking-wide leading-relaxed font-semibold text-sm mb-2">
              {user.bio}
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-200">
                <p className="text-blue-800 font-bold text-lg">
                  {user.public_repos}
                </p>
                <p className="text-gray-500 text-xs">Repos</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-200">
                <p className="text-blue-800 font-bold text-lg">
                  {user.followers}
                </p>
                <p className="text-gray-500 text-xs">Followers</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-200">
                <p className="text-blue-800 font-bold text-lg">
                  {user.following}
                </p>
                <p className="text-gray-500 text-xs">Following</p>
              </div>
            </div>
          </div>

          {repos.length > 0 && (
            <ul className="bg-gray-100 rounded-2xl p-4">
              <h2 className="text-gray-700  font-bold">Latest Repos</h2>
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="bg-white rounded-xl p-3 my-2 text-sm break-all border border-gray-200 hover:border-blue-300 transition duration-200"
                >
                  <p className="text-blue-800 font-semibold">{repo.name}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs text-gray-400">
                      {" "}
                      ★ {repo.stargazers_count}
                    </span>
                    <span className="text-xs text-gray-400">
                      {" "}
                      {repo.language || "unknown"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-800 text-white py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition duration-200 mt-4"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Day07;
