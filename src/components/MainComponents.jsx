import React, { useEffect, useState } from "react";
import NavbarComponents from "./NavbarComponents";
import FooterComponents from "./FooterComponents";
import CardComponents from "./CardComponents";

const MainComponents = () => {
  const [results, setResult] = useState([]);
  async function fetchData() {
    const BASE_URL =
      "https://api.themoviedb.org/3/discover/movie?api_key=ebea56b40073f666a5e4eda027c189ef";
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    setResult(data.results);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <NavbarComponents />
      <div className="w-full flex flex-wrap justify-center gap-5 bg-white dark:bg-gray-900">
        {results.map((result) => (
          <CardComponents
            key={result.id}
            img={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
            title={result.title}
          />
        ))}
      </div>
      <FooterComponents />
    </div>
  );
};

export default MainComponents;
