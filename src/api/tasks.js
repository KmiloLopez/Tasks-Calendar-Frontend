import axios from "./axios";//"./axios es una llamada a la instancia directamente"
//Peticiones relacionadas a tasks

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);
//Axios ya incluye las especificacionde de credentials: 'include' para permitir el paso de cookies del navegador

//aca vemos la alternativa con fetch para esta misma peticion:

// export const createTaskRequest = async (task) => {
//   try {
//     console.log("esta es la tarea antes de stringi",task);
//     console.log("esta es la tarea despues de stringi",JSON.stringify(task));
//     const response = await fetch("http://localhost:4000/api/tasks", {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
      
//       body: JSON.stringify(task),
//        credentials: 'include',
//        redirect: 'follow', El navegador sigue automáticamente las redirecciones , no necesario agregar ya que esta por defecto en 'follow'
      
      
//     });
    
//     if (!response.ok) {
//       throw new Error('Error en la solicitud: ' + response.status);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const updateTaskRequest = async (id,task) =>
  axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

export const getTasksRequestByDate = async (id) => axios.get(`/tasks/date/${id}`);