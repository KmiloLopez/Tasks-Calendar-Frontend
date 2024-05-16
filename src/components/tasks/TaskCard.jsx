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
dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask, updateTask, getTasksOnDate } = useTasks();
  const { taskStatus, setTaskStatus } = useContext(UpdateTaskContext);

  const dateNew = dayjs.utc(task.date).add(1, "day").format("YYYY-MM-DD"); //correccion de la fecha mostrada en pantalla .add para sumarle un dia

  return (
    <Card>
      <header className="flex justify-between bg-slate-600 p-0 items-center">
        
        <h2 className="text-5xl font-bold">PENDING</h2>
        <div className="flex gap-x-1 items-center">
          
          <IconButtonComp onClick={() => deleteTask(task._id)}>
            <DeleteIcon />
          </IconButtonComp>

          <ButtonLinkComp to={`/tasks/${task._id}`}>
            <IconButton>
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </ButtonLinkComp>
        </div>
      </header>
      <h1 className="text-2xl font-bold">{task.title}</h1>
        <h2 className="text-2xl font-bold">{task.priority}</h2>
      <p className="text-slate-300">{task.description}</p>
      <section>
        <p className="text-slate-400 text-2xl">
          {task.time} - {task.timeout}
        </p>
      </section>
      {/* <p>
        {task.date &&
          new Date(dateNew).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p> */}
      <div>
        <IconButton
          onClick={() => {
            setTaskStatus(!taskStatus);
            const updatedTask = { ...task, status: taskStatus }; // Actualiza el estado de la tarea
            updateTask(task._id, updatedTask);
            getTasksOnDate();
          }}
        >
          {task.status ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </div>
    </Card>
  );
}
