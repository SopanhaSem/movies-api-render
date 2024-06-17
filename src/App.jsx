import MainCard from "./components/MainCard";
import { useState, useEffect } from "react";
import { POPULAR_URL } from "./utils/popularUrl.js";
import { LoadingComponents } from "./components/LoadingComponents.jsx";
function App() {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(POPULAR_URL);
      const data = await response.json();
      setPopular(data.results);
      console.log(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center p-5">
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <div className="movies-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {popular.map((person) =>
            person.known_for.map((m) => (
              <MainCard
                key={m.id}
                img={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "default_image_path.jpg"
                }
                onClickCard={() => handleOnClickCard(m)}
                title={m.title}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
