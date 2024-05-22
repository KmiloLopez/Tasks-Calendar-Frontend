import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-red-500 flex justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold">React Tasks</h1>
        <p className="text-md text-slate-400">
          En CAMILARY, puedes organizar tus tareas diarias de manera eficiente.
          Nuestra aplicación te permite:
        </p>
        <p className="text-md text-slate-400">
          Agendar tareas para cada día, especificando su nivel de importancia.
        </p>
        <p className="text-md text-slate-400">
          Definir la hora de inicio y fin de cada tarea.{" "}
        </p>
        <p className="text-md text-slate-400">
          Proporcionar una descripción detallada de las tareas diarias.
        </p>
        <p className="text-md text-slate-400">
          {" "}
          Marcar las tareas como completadas una vez finalizadas.
        </p>
        <p className="text-md text-slate-400">
          Además, en la vista general de CAMILARY, verás un ícono en la parte
          superior de cada día, indicando los días con tareas programadas.
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
