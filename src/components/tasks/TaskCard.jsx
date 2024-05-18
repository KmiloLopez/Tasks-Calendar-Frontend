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

export function TaskCard({ task }) {
  const { deleteTask, updateTask, getTasksOnDate } = useTasks();
  const { taskStatus, setTaskStatus } = useContext(UpdateTaskContext);

  const dateNew = dayjs.utc(task.date).add(1, "day").format("YYYY-MM-DD"); //correccion de la fecha mostrada en pantalla .add para sumarle un dia
  
  
    let backgroundColorClass = '';
    
    switch (task.priority) {
      case 'High':
        backgroundColorClass = 'bg-red-500';
        break;
      case 'Medium':
        backgroundColorClass = 'bg-orange-500';
        break;
      case 'Low':
        backgroundColorClass = 'bg-blue-500';
        break;
      default:
        backgroundColorClass = 'bg-blue-500';
        break;
    }

    let completedbackgroundColorClass ='';
    if(task.status) {
      
        completedbackgroundColorClass = 'bg-green-500';
      }else{
        completedbackgroundColorClass = '';
      }
   
  
  return (
    <CardComp>
      <header className={`flex justify-between p-0 items-center ${completedbackgroundColorClass}`}>
        
        <h2 className="text-4xl font-bold">{task.status?"COMPLETED":"PENDING"}</h2>
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
        
      <p className="text-slate-300">{task.description}</p>
      <section>
        <p className="text-slate-400 text-2xl">
          {task.time} - {task.timeout}
        </p>
      </section>
      <section className={`text-1xl font-bold ${backgroundColorClass} rounded`}>
        <p>Priority: {task.priority}</p>
        </section>
      
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
    </CardComp>
  );
}
