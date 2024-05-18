import React, { useEffect, useState } from 'react'

const ThemeButton = ({children}) => {
    //pasamos la funcion dento de useState para verificar cual es la configuración
    //predeterminada del navegador si esta en modo oscuro lo asignara inicialmente como "dark"
    const [theme, setTheme] = useState(()=>{
        if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
        return "light";
      });

      const handleChangeTheme = ()=>{
        setTheme(prevTheme => prevTheme === "light" ? "dark" :"light");
       };
//seleccion de un unico html en el proyecto y aca es donde agregamos el dark.
//sin embargo se podria agregar en cualquier componente del arbol
      useEffect(()=>{
        if(theme === "dark"){
          document.querySelector("html").classList.add("dark");
        }else{
          document.querySelector("html").classList.remove("dark");
        }
   },[theme]);
  return (
    <button onClick={handleChangeTheme}
    className='bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-400'
    >{children}</button>
  )
}

export default ThemeButton