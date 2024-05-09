import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const dateNew= dayjs.utc(task.date).add(1,"day").format("YYYY-MM-DD");//correccion de la fecha mostrada en pantalla .add para sumarle un dia
  
console.log("task.date en component TaskCard",dateNew)
  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)}>Delete</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      
      <p>
        {task.date &&
        
          new Date(dateNew).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            
          })}
      </p>
    </Card>
  );
}
