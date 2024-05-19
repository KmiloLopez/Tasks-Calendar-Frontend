import { useEffect, useContext, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { useParams } from "react-router-dom"; //useParams es para poder obtener un objeto con los datos dinamicos que van en la url
import dayjs from "dayjs";
import CalendarMUI from "../components/calendar/CalendarMUI";
import { SelectedDateContext } from "../context/selectDayContext";
import { UpdateTaskContext } from "../context/updatetaskContext";
import { Button, ButtonLink } from "../components/ui";
import ThemeButton from "../components/buttons/ThemeButton";

export function TasksPage() {
  const { tasks, getTasks, getTasksOnDate, getTasksOnMonth, daysOnMonth } =
    useTasks();
  const { dayselected, selectedMonthYear } = useContext(SelectedDateContext);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [todaysD, setTodaysD] = useState(null);
  const { taskStatus } = useContext(UpdateTaskContext);
  const [firstRender, setFirstRender] = useState(true); // Variable de control
  const params = useParams();

  useEffect(() => {
    console.log("accessed useEffct");
    if (!firstRender) {
      setIsDaySelected(true);

      if (!dayselected) {
        console.log("dayselected1", dayselected);
        setTodaysD(dayjs().format("YYYY-MM-DD"));
        getTasksOnDate(dayjs().format("YYYY-MM-DD"));
      } else {
        console.log("dayselected2", dayselected);

        // const newt = JSON.stringify(valuesArray[2]).split("T")[0].slice(1); //cambio formato hora
        setTodaysD(dayjs(dayselected).format("DD MMM YYYY"));
        getTasksOnDate(dayjs(dayselected).format("YYYY-MM-DD"));
      }

      if (selectedMonthYear) {
        const dateAdjusted = dayjs(selectedMonthYear).add(0, "month");
        getTasksOnMonth(dateAdjusted);
      } else {
        const todaysDate = dayjs().format("YYYY-MM-DD");
        getTasksOnMonth(todaysDate);
      }
    } else {
      setIsDaySelected(true);

      console.log("el FirstRender", daysOnMonth);

      const todaysDate = dayjs().format("YYYY-MM-DD");
      setTodaysD(dayjs().format("DD MMM YYYY"));
      getTasksOnDate(todaysDate); //newdateformat= 2024-05-15
      setFirstRender(false); // Si es la primera renderización, marca que ya no lo es
      console.log("haciendo peticion con:", todaysDate);

      getTasksOnMonth(todaysDate);
    }
  }, [dayselected, taskStatus, selectedMonthYear]); //con el cambio de taskStatus se hace una nueva renderizacion de tasks para mostrar si la tarea se completo

  useEffect(() => {
    console.log("aca esta daysonmonth", daysOnMonth);
  }, [daysOnMonth]);

  return (
    <>
      <div className="bg-slate-500">
        <CalendarMUI daysonmonth={daysOnMonth} />
      </div>
      <section className="flex justify-center gap-5 my-1">
        <h1 className="font-bold text-xl text-gray-400">{todaysD}</h1>
        <ButtonLink to="/add-task" style={{}}>
          Add Task
        </ButtonLink>
      </section>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10 ">
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

      <ThemeButton>ThemeCHANGE</ThemeButton>
    </>
  );
}
