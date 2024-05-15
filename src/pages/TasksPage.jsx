import { useEffect, useContext, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { useParams } from "react-router-dom"; //useParams es para poder obtener un objeto con los datos dinamicos que van en la url

import CalendarMUI from "../components/calendar/CalendarMUI";
import { SelectedDateContext } from "../context/selectDayContext";

export function TasksPage() {
  const { tasks, getTasks, getTasksOnDate } = useTasks();
  const { dayselected } = useContext(SelectedDateContext);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [firstRender, setFirstRender] = useState(true); // Variable de control
  const params = useParams();

  useEffect(() => {
    console.log("accessed useEffct");
    if (!firstRender) {
      setIsDaySelected(true);
      const valuesArray = Object.values(dayselected);//extraccion de values en objeto
      
      const newt = JSON.stringify(valuesArray[2]).split("T")[0].slice(1);//cambio formato hora

      getTasksOnDate(newt);
    } else {
      // Si es la primera renderización, marca que ya no lo es
      setFirstRender(false);
    }
  }, [dayselected]);

  return (
    <>
      <div className="bg-slate-500">
        <CalendarMUI />
      </div>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}
      {isDaySelected ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      ) : (
        <h1>Selecciona el dia</h1>
      )}
    </>
  );
}
