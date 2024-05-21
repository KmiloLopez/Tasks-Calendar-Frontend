import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useState } from "react";
import HamburIcon from "./hamburgericon/HambuIcon";
import AccountMenu from "./menu/Menu";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);
  const [modalDisplayed, setModalDisplayed] = useState(false);

  const showmodal = () => {
    setModalDisplayed(!modalDisplayed);
  };

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-3 px-3 rounded-lg">
      <h1 className="text-3xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-3 items-end">
        {isAuthenticated ? (
          <>
            <li>
              <AccountMenu user={user} logout={logout} />
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
