import axios from "./axios";//"./axios es una llamada a la instancia directamente"
//Peticiones relacionadas a tasks

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (id,task) =>
  axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

export const getTasksRequestByDate = async (id) => axios.get(`/tasks/date/${id}`);