import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AiFillBell,
  AiFillCaretDown,
  AiFillHeart,
  AiFillHome,
  AiFillMobile,
  AiFillPlayCircle,
  AiFillStar,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiCameraMovie, BiSlideshow } from "react-icons/bi";
import MenuItem from "./MenuItem";

function Nav() {
  const [show, handleshow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
    } else {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleshow(true);
        } else handleshow(false);
      });
      return () => {
        window.removeEventListener("scroll", null);
      };
    }
  }, []);

  return (
    <div
      className={`top-0 fixed w-[100%] px-20 py-4 h-24 z-[1] transition-all duration-300 ease-in space-between  ${
        show ? "bg-black " : " bg-transparent drop-shadow-2xl"
      }`}
    >
      <div className="flex items-center space-x-[20%] md:space-x-40 h-[100%] mr-4  ">
        <img
          className="fixed w-[20%] md:w-32 object-contain left-[4%]  "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        {/* MENU */}
        <div className="flex text-gray-100 space-x-6 text-[130%] pb-1">
          <div className="flex items-center space-x-1">
            <h2 className="font-bold hidden md:flex text-white ">Home</h2>
            <AiFillHome className="relative md:hidden" />
          </div>
          <div className="flex items-center space-x-1 ">
            <MenuItem name="TV Shows" />
            <BiSlideshow className="relative md:hidden" />
          </div>
          <div className="flex items-center space-x-1">
            <MenuItem name="Movies" />

            <BiCameraMovie className="relative md:hidden" />
          </div>{" "}
          <div className="flex items-center space-x-1">
            <MenuItem name="New & Popular" />
            <AiFillStar className="relative md:hidden" />
          </div>
          <div className="flex items-center space-x-1">
            <MenuItem name="My List" />
            <AiFillHeart className="relative md:hidden" />
          </div>
        </div>
        <div className="flex items-center">
          <AiOutlineSearch
            className="text-white hidden md:fixed lg:flex z-50 right-[14%] rounded-lg"
            size="30px"
          />
          <AiFillBell
            className="text-white hidden md:fixed lg:flex z-50 right-[11%] rounded-lg"
            size="30px"
          />
          <img
            className="nav_avatar"
            src="https://i.ibb.co/P4T7HYz/image-2021-08-24-004649-removebg-preview.png"
            alt="Netflix Logo"
            width="90px"
            height="45px"
            className="hidden md:fixed lg:flex right-[4.5%] top-[4px] rounded-lg hover:backdrop-filter"
          ></img>
          <AiFillCaretDown className="hidden md:fixed lg:flex  right-[2.5%] text-white" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
