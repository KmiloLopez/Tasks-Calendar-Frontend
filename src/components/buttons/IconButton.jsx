import React from "react";

const IconButtonComp = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" hover:bg-green-300 text-white rounded h-10 w-10 flex justify-center p-0 items-center"
    >
      {children}
    </button>
  );
};

export default IconButtonComp;
