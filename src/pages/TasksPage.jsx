import { useEffect, useContext, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { useParams } from "react-router-dom"; //useParams es para poder obtener un objeto con los datos dinamicos que van en la url
import dayjs from "dayjs";
import CalendarMUI from "../components/calendar/CalendarMUI";
import { SelectedDateContext } from "../context/selectDayContext";
import { UpdateTaskContext } from "../context/updatetaskContext";

export function TasksPage() {
  const { tasks, getTasks, getTasksOnDate } = useTasks();
  const { dayselected } = useContext(SelectedDateContext);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [todaysD, setTodaysD] = useState(null);
  const { taskStatus} = useContext(UpdateTaskContext);
  const [firstRender, setFirstRender] = useState(true); // Variable de control
  const params = useParams();

  useEffect(() => {
    console.log("accessed useEffct");
    if (!firstRender) {
      setIsDaySelected(true);

      const valuesArray = Object.values(dayselected);//extraccion de values en objeto
      console.log("valuesArray", valuesArray)
      const newt = JSON.stringify(valuesArray[2]).split("T")[0].slice(1);//cambio formato hora
      setTodaysD(dayjs(newt).format("DD MMM YYYY"))
      
      getTasksOnDate(newt);

    } else {
      setIsDaySelected(true);
      
      console.log("el FR");
      const todaysdate = new Date
      let newdateformat = JSON.stringify(todaysdate).split("T")[0].slice(1);
      console.log("todaysdate", todaysdate);
      setTodaysD(dayjs(newdateformat).format("DD MMM YYYY"))

      getTasksOnDate(newdateformat);//newdateformat= 2024-05-15
      setFirstRender(false);// Si es la primera renderización, marca que ya no lo es
    }
  }, [dayselected, taskStatus]);//con el cambio de taskStatus se hace una nueva renderizacion de tasks para mostrar si la tarea se completo

  return (
    <>
      <div className="bg-slate-500">
        <CalendarMUI />
      </div>
      <h1>{todaysD}</h1>
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
