import React from 'react'
import { Link } from 'react-router-dom';

const ButtonLinkX = ({ to, children }) => {
  return (
    <Link
    to={to}
    className="bg-blue-500 hover:bg-blue-700 text-white rounded h-7 w-10 flex justify-center p-0 items-center"
  >
    {children}
  </Link>
  )
}

export default ButtonLinkX