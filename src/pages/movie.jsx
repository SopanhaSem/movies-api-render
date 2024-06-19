import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/baseUrl";
import CardComponents from "../components/CardComponents";
import { LoadingComponents } from "../components/LoadingComponents";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function handleOnClickCard(data) {
    navigate("/detail", { state: data });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center p-5 bg-white dark:bg-gray-800">
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <div className="movies-containercontainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {movies.map((m) => (
            <CardComponents
              key={m.id}
              img={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                  : "default_image_path.jpg"
              }
              onClickCard={() => handleOnClickCard(m)}
              title={m.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
