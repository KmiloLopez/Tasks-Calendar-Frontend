import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";//useParams es para poder obtener un objeto con los datos dinamicos que van en la url
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { MobileTimePicker} from '@mui/x-date-pickers';
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();//importacion de las tareas creadas en tasksContext
  const [selectedTime, setSelectedTime] =useState(null);//dayjs('2022-04-17T15:30')
  const [selectedTimeout, setSelectedTimeout] =useState(null);//dayjs('2022-04-17T15:30')
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,// permite establecer los campos de el form
    handleSubmit,
    formState: { errors },
  } = useForm();//importacion de regiter, handleSubmit desde el useForm

  const onSubmit = async (data) => {//data son los datos de los campos del form
    try {
      if (params.id) {//si params.id existe esto indica que estamos editando si no existe estamos creando
        console.log("esto es params.id", params.id)
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),//formateo fecha para que concuerde con el formato del backend schema(modelo)
        });
      } else {
        if(data.date) {
          console.log("nueva tarea para fecha", data.date)
          
          createTask({
            ...data,
            date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),//formateo fecha para que concuerde con el formato del backend schema(modelo)
            time: dayjs(selectedTime.$d).format("hh:mm A"),
            timeout:dayjs(selectedTimeout.$d).format("hh:mm A"),
            status: false,
          });

        }else{
          
          
          createTask({
            ...data,
            date: dayjs.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            time: dayjs(selectedTime.$d).format("hh:mm A"),
            timeout:dayjs(selectedTimeout.$d).format("hh:mm A"),
            status: false,
          });
          
        }
      }

      // navigate("/tasks") redirecciona a /tasks;
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };



  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);//en el campo title asignele lo que llega en task.title
        setValue("description", task.description);
        setValue("priority", task.priority);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("time", task.time);
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
          
      
    
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="priority">Priority</Label>
        <select name="priority" {...register("priority")}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <Label htmlFor="time">Start</Label>
        <MobileTimePicker {...register("time")}
          label="FROM"
          name="time"
          id="time"
          value={selectedTime} onChange={(newValue) => setSelectedTime(newValue)}
        
        />
        <Label htmlFor="time">Finish</Label>
        <MobileTimePicker {...register("timeout")}
          label="FROM"
          name="timeout"
          id="timeout"
          value={selectedTimeout} onChange={(newValue) => setSelectedTimeout(newValue)}
        
        />

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
