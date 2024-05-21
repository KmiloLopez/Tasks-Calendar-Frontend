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
  const [firstRender2, setFirstRender2] = useState(true); // Variable de control
  const [visibleCalendar, setVisibleCalendar] = useState(true);
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
      if (visibleCalendar) {
        if (selectedMonthYear) {
          const dateAdjusted = dayjs(selectedMonthYear).add(0, "month");
          getTasksOnMonth(dateAdjusted);
        } else {
          const todaysDate = dayjs().format("YYYY-MM-DD");
          getTasksOnMonth(todaysDate);
        }
      }
    } else {
      setIsDaySelected(true);

      console.log("el FirstRender", daysOnMonth);

      const todaysDate = dayjs().format("YYYY-MM-DD");
      setTodaysD(dayjs().format("DD MMM YYYY"));
      getTasksOnDate(todaysDate); //newdateformat= 2024-05-15
      setFirstRender(false); // Si es la primera renderización, marca que ya no lo es
      console.log("haciendo peticion con:", todaysDate);
      if (visibleCalendar) {
        getTasksOnMonth(todaysDate);
      }
    }
  }, [dayselected, selectedMonthYear]); //con el cambio de taskStatus se hace una nueva renderizacion de tasks para mostrar si la tarea se completo

  useEffect(() => {
    if (!firstRender2) {
      //setIsDaySelected(true);

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
    } else {
      //setIsDaySelected(true);

      console.log("el FirstRender", daysOnMonth);

      const todaysDate = dayjs().format("YYYY-MM-DD");
      setTodaysD(dayjs().format("DD MMM YYYY"));
      getTasksOnDate(todaysDate); //newdateformat= 2024-05-15
      setFirstRender2(false); // Si es la primera renderización, marca que ya no lo es
    }
  }, [taskStatus]);

  const handleCalendarDisplay = () => {
    setVisibleCalendar(!visibleCalendar);
  };

  return (
    <>
      <div className="bg-slate-500 relative">
        {visibleCalendar ? (
          <CalendarMUI daysonmonth={daysOnMonth} />
        ) : (
          <div
            onClick={handleCalendarDisplay}
            className="bg-slate-500 h-5 relative hover:bg-slate-700 ml-3 text-slate-300 pb-6"
          >
            Show-Calendar
          </div>
        )}
        <button
          onClick={handleCalendarDisplay}
          className="absolute right-4 bottom-0 hover:text-slate-700"
        >
          {visibleCalendar ? "▲" : "▼"}
        </button>
      </div>
      <section className="flex justify-center gap-5 my-1">
        <h1 className="font-bold text-3xl text-gray-400">{todaysD}</h1>
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
