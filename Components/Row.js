import { Button, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import {
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";
const base_URL = "https://image.tmdb.org/t/p/original/";
const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          maxWidth: ["95%", "95%", "95%"],
          minWidth: "95%",
          bg: "#000",
        },
      }),
    },
  },
});
function Row({ title, fetchUrl, isLargeRow }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };
  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <div className="ml-5 mt-10">
        <h2 className="text-white font-semibold">{title}</h2>
        <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
          {/* row poster */}
          {movies.map((movie) => (
            <Image
              key={movie.id}
              onClick={() => {
                onOpen();
                handleClick(movie);
              }}
              className={`w-[100%] object-contain max-h-28 transition transform duration-500 mr-3 hover:scale-105 rounded-lg`}
              src={`${base_URL}${movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size="6xl"
          variant="wide"
          className="bg-transparent"
        >
          <ModalContent>
            <ModalBody>
              {trailerUrl && (
                <YouTube
                  videoId={trailerUrl}
                  opts={opts}
                  className="w-[100%] h-[600px] rounded-xl transition duration-200 transfrom ease-in"
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
}

export default Row;
