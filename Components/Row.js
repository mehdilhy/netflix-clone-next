import { Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "./axios";
const base_URL = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="ml-5 ">
      <h2 className="text-white font-semibold">{title}</h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
        {/* row poster */}
        {movies.map((movie) => (
          <Image
            key={movie.id}
            className={
              isLargeRow
                ? `w-[100%] object-contain max-h-72 transition transform duration-500 mr-3 hover:scale-105 rounded-lg`
                : `w-[100%] object-contain max-h-28 transition transform duration-500 mr-3 hover:scale-105 rounded-lg`
            }
            src={`${base_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
