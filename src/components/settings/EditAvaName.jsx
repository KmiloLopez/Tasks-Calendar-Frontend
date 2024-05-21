import React from "react";
import { useState } from "react";

const EditAvaName = ({ handleClickEdit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleFormUpdate = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Form submitted with value:", inputValue);
    // Aquí puedes agregar el código para manejar la actualización, como una llamada a una API
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
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
            <form onSubmit={handleFormUpdate}>
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
  );
};

export default EditAvaName;
