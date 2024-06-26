import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  getTasksRequestByDate,
  getMonthTasksRequestByDate,
} from "../api/tasks";
import Notiflix from "notiflix";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [daysOnMonth, setDaysOnMonth] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const getTasksOnDate = async (id) => {
    const res = await getTasksRequestByDate(id);
    setTasks(res.data);
  };
  const getTasksOnMonth = async (id) => {
    const res = await getMonthTasksRequestByDate(id);
    console.log("esta es la respuesta del servidor res:", res.data);
    setDaysOnMonth(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id)); //esta linea modifica las tareas creado un arreglo nuevo sin incluir la tarea que acabamos de eliminar(cuando se dio click en delete) si no se agrega, si se borra pero solo se ve la modificacion cuando refrescamos la pagina completa
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      console.log("createTask request width", task);
      const res = await createTaskRequest(task);
      console.log(res.data);
      Notiflix.Notify.success("Task created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task, fromcard) => {
    try {
      console.log("updating task with id:", id);
      await updateTaskRequest(id, task);
      console.log("ESTO es Task.fromcard en taskContext", fromcard);
      if (!fromcard) {
        Notiflix.Notify.success("Task updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        // este es el retorno o lo que exporta
        tasks,
        daysOnMonth,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        getTasksOnDate,
        getTasksOnMonth,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
