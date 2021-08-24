import React from "react";

function MenuItem({ name }) {
  return (
    <div className="flex items-center space-x-1">
      <h2 className=" hidden md:flex hover:text-gray-300 whitespace-nowrap transition duration-300 ease-in cursor-pointer hover:scale-105">
        {name}
      </h2>
    </div>
  );
}

export default MenuItem;
