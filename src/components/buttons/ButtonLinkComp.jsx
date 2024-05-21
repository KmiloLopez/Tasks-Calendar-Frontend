import React from "react";
import { Link } from "react-router-dom";

const ButtonLinkComp = ({ to, children }) => {
  return (
    <Link
      to={to}
      className=" hover:bg-green-300 text-white rounded h-10 w-10 flex justify-center p-0 items-center"
    >
      {children}
    </Link>
  );
};

export default ButtonLinkComp;
