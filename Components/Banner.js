import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import Image from "next/image";

import { AiFillPlayCircle, AiFillInfoCircle } from "react-icons/ai";
import { Button } from "@chakra-ui/react";
function Banner() {
  const [movie, setMovie] = useState([]);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomNumber = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      console.log(randomNumber);
      if (request.data.results[randomNumber]) {
        const test = await axios.get(
          `/tv/${request.data.results[randomNumber].id}/images?api_key=660e0e34ec05807e0615efd51524ecda`
        );
        if (test.data.logos.length > 0) {
          setLogo(test.data.logos[0].file_path);
        }
      }
      setMovie(request.data.results[randomNumber]);
      // Math.floor(Math.random() * request.data.results.length -1)
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie)

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="bg-cover bg-center w-[100%] text-white min-h-[75%] bg-no-repeat"
      style={{
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        boxShadow: "inherit",
      }}
    >
      <div className="ml-[4%] pt-[20%] pb-[20%] space-y-5 ">
        {logo == "" ? (
          <h1 className="text-4xl md:text-5xl pb-1 font-black">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original/${logo}`}
            alt=""
            width="550%"
            height="100%"
            className=" pl-10"
            objectPosition="fit"
          />
        )}
        <h1 className="w-[100%] md:w-[150%] text-lg md:text-xl lg:text-2xl max-w-lg h-[30%] font-semibold ">
          {truncate(movie?.overview, 100)}
        </h1>
        <div className="space-x-4">
          <Button
            leftIcon={<AiFillPlayCircle />}
            bgColor="white"
            color="black"
            size="lg"
          >
            Play
          </Button>
          <Button
            leftIcon={<AiFillInfoCircle />}
            bgColor="gray"
            color="white"
            size="lg"
          >
            More Info
          </Button>
        </div>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
