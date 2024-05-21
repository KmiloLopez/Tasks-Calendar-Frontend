import React from "react";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import EditAvaName from "./EditAvaName";

const SettingsBox = ({ handleSettings }) => {
  const [displayEditBox, setDisplayEditBox] = useState(false);
  const togglePopup = () => {
    handleSettings();
  };
  const handleClickEdit = () => {
    setDisplayEditBox(!displayEditBox);
  };

  return (
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
        </div>
      </div>
      {displayEditBox && <EditAvaName handleClickEdit={handleClickEdit} />}
    </div>
  );
};

export default SettingsBox;
