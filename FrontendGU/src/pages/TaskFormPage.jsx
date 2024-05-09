import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";//useParams es para poder obtener un objeto con los datos dinamicos que van en la url
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();//importacion de las tareas creadas en tasksContext
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
          console.log("nueva tarea")
          createTask({
            ...data,
            date: dayjs.utc(data.date).format(),
          });

        }else{
          console.log("no se ingreso fecha asignando el dia de hoy2")
          createTask({
            ...data,
            date: dayjs.utc().format(),
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
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
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

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
