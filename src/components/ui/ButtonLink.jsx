import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children, style }) => (
  <Link
    to={to}
    style={style}
    className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-400"
  >
    {children}
  </Link>
);
