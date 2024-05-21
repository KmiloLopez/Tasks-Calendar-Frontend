import React, { useState } from "react";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ImBackward } from "react-icons/im";
const HamburIcon = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickEdit = () => {
    setIsOpen(!isOpen);
    setEditIsOpen(!editIsOpen);
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Form submitted with value:", inputValue);
    // Aquí puedes agregar el código para manejar la actualización, como una llamada a una API
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="relative">
      <div
        className="p-0 hover:bg-cyan-500 text-white rounded focus:outline-none mb-1"
        onClick={togglePopup}
      >
        <IconButton>
          <MenuIcon
            sx={{
              minWidth: 5,
              color: "white",
            }}
          />
        </IconButton>
      </div>
      {editIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-zinc-800 p-8 rounded shadow-lg w-80 relative border-cyan-500 border-2">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={handleClickEdit}
            >
              ✖
            </button>
            <section className="flex flex-col items-center w-full mb-4">
              <div className="w-12 h-12 bg-gray-200"></div>
              <div className="flex mt-4 items-end gap-2">
                <h1 className="">Cami Account</h1>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter text"
                  />
                  <button type="submit">Save</button>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-zinc-800 p-8 rounded shadow-lg w-80 relative border-cyan-500 border-2">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={togglePopup}
            >
              ✖
            </button>
            <section className="flex flex-col items-center w-full mb-4">
              <div className="w-12 h-12 bg-gray-200"></div>
              <div className="flex mt-4 items-end gap-2">
                <h1 className="">Cami Account</h1>
                <div>
                  <IconButton onClick={handleClickEdit}>
                    <BorderColorIcon
                      size="medium"
                      sx={{
                        maxWidth: 15,
                        color: "white",
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </section>

            <div className="flex flex-col space-y-4">
              <button className="bg-gray-500 text-white p-2 rounded hover:bg-slate-600 hover:border-2 hover:border-cyan-500">
                Share Calendar
              </button>
              <button className="bg-gray-500 text-white p-2 rounded hover:bg-slate-600 hover:border-2 hover:border-cyan-500">
                Enter Code
              </button>
              <button className="bg-gray-500 text-white p-2 rounded hover:bg-slate-600 hover:border-2 hover:border-cyan-500">
                Log out
              </button>
              <Link
                className="bg-gray-500 text-white p-2 rounded hover:bg-slate-600 hover:border-2 hover:border-cyan-500"
                to="/"
                onClick={() => logout()}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburIcon;
