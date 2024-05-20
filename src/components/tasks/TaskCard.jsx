import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useContext, useEffect, useState } from "react";
import { UpdateTaskContext } from "../../context/updatetaskContext";
import { SelectedDateContext } from "../../context/selectDayContext";
import IconButtonComp from "../buttons/IconButton";
import ButtonLinkComp from "../buttons/ButtonLinkComp";
import CardComp from "../card/CardComp";
dayjs.extend(utc);
//using theme
import theme from "../../style/themeColors";
//using theme

export function TaskCard({ task }) {
  const { deleteTask, updateTask, getTasksOnDate } = useTasks();
  const { taskStatus, setTaskStatus } = useContext(UpdateTaskContext);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const dateNew = dayjs.utc(task.date).add(1, "day").format("YYYY-MM-DD"); //correccion de la fecha mostrada en pantalla .add para sumarle un dia

  let backgroundColorClass = "";

  switch (task.priority) {
    case "High":
      backgroundColorClass = "bg-red-700";
      break;
    case "Medium":
      backgroundColorClass = "bg-orange-700";
      break;
    case "Low":
      backgroundColorClass = "bg-blue-700";
      break;
    default:
      backgroundColorClass = "bg-blue-700";
      break;
  }

  let completedbackgroundColorClass = "";
  if (task.status) {
    completedbackgroundColorClass = "bg-green-500";
  } else {
    completedbackgroundColorClass = "";
  }

  const handleTaskStatus = () => {
    console.log("handleTaskStatus Clicked this is task", task);
    const currrentTaskSatus = task.status;
    const formcard = "true";
    const updatedTask = { ...task, status: !currrentTaskSatus }; // Actualiza el estado de la tarea
    updateTask(task._id, updatedTask, formcard);
    setTaskStatus(!taskStatus);
  };

  return (
    <CardComp>
      <header
        className={`flex justify-between p-0 items-center rounded ${completedbackgroundColorClass}`}
      >
        <h2 className="text-4xl font-bold text-slate-700">
          {task.status ? "COMPLETED" : "PENDING"}
        </h2>
        {task.status ? (
          <div className="flex gap-x-1 items-center">
            <IconButtonComp onClick={() => deleteTask(task._id)}>
              <DeleteIcon
                sx={{
                  color: "cardicons.main",
                  ":hover": {
                    color: "cardicons.main",
                  },
                }}
              />
            </IconButtonComp>

            <ButtonLinkComp to={`/tasks/${task._id}`}>
              <IconButton>
                <DriveFileRenameOutlineIcon
                  sx={{
                    color: "cardicons.main",
                    ":hover": {
                      color: "cardicons.main",
                    },
                  }}
                />
              </IconButton>
            </ButtonLinkComp>
          </div>
        ) : (
          <div className="flex gap-x-1 items-center">
            <IconButtonComp onClick={() => deleteTask(task._id)}>
              <DeleteIcon
                sx={{
                  color: "cardicons.main",
                }}
              />
            </IconButtonComp>

            <ButtonLinkComp to={`/tasks/${task._id}`}>
              <IconButton>
                <DriveFileRenameOutlineIcon
                  sx={{
                    color: "cardicons.main",
                  }}
                />
              </IconButton>
            </ButtonLinkComp>
          </div>
        )}
      </header>
      <h1 className="text-2xl font-bold">{task.title}</h1>

      <p className="text-slate-300">{task.description}</p>
      <section>
        <p className="text-slate-400 text-2xl">
          {task.time} - {task.timeout}
        </p>
      </section>
      <section
        className={`text-1xl font-bold ${backgroundColorClass} rounded w-1/3`}
      >
        <p>Priority: {task.priority}</p>
      </section>

      <section className="flex justify-end text-slate-300">
        <IconButton onClick={handleTaskStatus}>
          {task.status ? (
            <TaskAltIcon
              sx={{
                color: "completed.main",
                ":hover": {
                  color: "completedhover.main",
                },
              }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              sx={{
                color: "pending.main",
                ":hover": {
                  color: "completedhover.main",
                },
              }}
            />
          )}
        </IconButton>
      </section>
    </CardComp>
  );
}
