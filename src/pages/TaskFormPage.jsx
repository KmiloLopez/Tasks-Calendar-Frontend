import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //useParams es para poder obtener un objeto con los datos dinamicos que van en la url
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Input } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { MobileTimePicker } from "@mui/x-date-pickers";
import CardComp from "../components/card/CardComp";
import ButtonLinkX from "../components/buttons/ButtonLinkX";
import "../style/newtaskstyle.css";
import { SelectedDateContext } from "../context/selectDayContext";

dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks(); //importacion de las tareas creadas en tasksContext
  const [selectedTime, setSelectedTime] = useState(null); //dayjs('2022-04-17T15:30'){$d: "00:00 AM" }
  const [selectedTimeout, setSelectedTimeout] = useState(null); //dayjs('2022-04-17T15:30')
  const [showTimeFrame, setShowTimeFrame] = useState(false);
  const navigate = useNavigate();
  const { dayselected } = useContext(SelectedDateContext);
  const params = useParams();

  const handleTimeFrame = () => {
    setShowTimeFrame(!showTimeFrame);
  };
  //const defaultDate = dayjs().format("YYYY-MM-DD");
  const defaultDate = dayjs(dayselected).format("YYYY-MM-DD");
  //const defaultTime = {"00:00 AM"};

  const {
    reset,
    register,
    setValue, // permite establecer los campos de el form
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: defaultDate,
    },
  }); //importacion de regiter, handleSubmit desde el useForm

  //const defaultDate = dayjs("2022-04-17T15:30").format("mm-dd-yyyy");
  const onSubmit = async (data) => {
    //data son los datos de los campos del form
    console.log("data:", data);
    console.log("data.time", data.time);
    console.log("data.timeout", data.timeout);

    try {
      if (params.id) {
        //si params.id existe esto indica que estamos editando si no existe estamos creando
        console.log("esto es params.id", params.id);
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(), //formateo fecha para que concuerde con el formato del backend schema(modelo)
        });
      } else {
        if (
          data.time === undefined ||
          data.time === "" ||
          data.timeout === undefined ||
          data.timeout === ""
        ) {
          if (
            (data.time === undefined || data.time === "") &&
            (data.timeout === undefined || data.timeout === "")
          ) {
            console.log("numero 1");
            data.time = dayjs("2022-04-17T14:22").format("hh:mm A");
            data.timeout = dayjs("2022-04-17T14:22").format("hh:mm A");
            createTask({
              ...data,
              date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              status: false,
            });
            reset();
            setSelectedTime(null);
            setSelectedTimeout(null);
          } else if (data.timeout === undefined || data.timeout === "") {
            console.log("numero 2");
            data.timeout = dayjs("2022-04-17T14:22").format("hh:mm A");
            createTask({
              ...data,
              time: dayjs(selectedTime).format("hh:mm A"),
              date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              status: false,
            });
            reset();
            setSelectedTime(null);
            setSelectedTimeout(null);
          } else {
            console.log("numero 3");
            data.time = dayjs("2022-04-17T14:22").format("hh:mm A");
            createTask({
              ...data,
              timeout: dayjs(selectedTimeout).format("hh:mm A"),
              date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              status: false,
            });
            reset();
            setSelectedTime(null);
            setSelectedTimeout(null);
          }
        } else {
          if (data.date) {
            console.log("numero 4");
            console.log("nueva tarea para fecha", data.date);

            createTask({
              ...data,
              date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), //formateo fecha para que concuerde con el formato del backend schema(modelo)
              time: dayjs(selectedTime).format("hh:mm A"),
              timeout: dayjs(selectedTimeout).format("hh:mm A"),
              status: false,
            });
            reset();
            setSelectedTime(null);
            setSelectedTimeout(null);
          } else {
            console.log("numero 5");
            createTask({
              ...data,
              date: dayjs.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              time: dayjs(selectedTime).format("hh:mm A"),
              timeout: dayjs(selectedTimeout).format("hh:mm A"),
              status: false,
            });
            reset();
            setSelectedTime(null);
            setSelectedTimeout(null);
          }
        }
      }

      // naviButton className="btn btn-/tasks") redirecciona a /tasks;
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title); //en el campo title asignele lo que llega en task.title
        setValue("description", task.description);
        setValue("priority", task.priority);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : "",
        );
        setValue("time", task.time);
        setValue("timeout", task.timeout);
        setSelectedTime(dayjs(task.time, "hh:mm A"));
        setSelectedTimeout(dayjs(task.timeout, "hh:mm A"));
      }
    };
    loadTask();
  }, [params.id, setValue, getTask]);

  const closeOnSelectOption = true;
  const newcolor = "bg-orange-600";

  return (
    <>
      <div className="w-full flex justify-center">
        <CardComp>
          <h1 className="text-center text-3xl font-bold">CREATE NEW TASK</h1>
          <div className="absolute top-1 right-2">
            <ButtonLinkX to="/tasks">X</ButtonLinkX>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Task Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              {...register("title")}
              autoFocus
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">
                Please enter a title.
              </p>
            )}

            <label htmlFor="description">Description</label>
            <Textarea
              name="description"
              id="description"
              rows="3"
              placeholder="Description"
              {...register("description")}
            ></Textarea>

            <section className="flex gap-5">
              <label htmlFor="priority">Priority:</label>
              <select
                className={`tother "success.main" ${newcolor}`}
                name="priority"
                {...register("priority")}
              >
                <option className="bg-lime-400 dark:bg-slate-400" value="Low">
                  Low
                </option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </section>
            <button type="button" onClick={handleTimeFrame}>
              Add Time-Frame
            </button>
            {showTimeFrame ? (
              <>
                <section className="flex flex-col">
                  <label htmlFor="time">Start-TIME</label>
                  <MobileTimePicker
                    {...register("time")}
                    name="time"
                    id="time"
                    closeOnSelect={closeOnSelectOption}
                    value={selectedTime}
                    onChange={(newValue) => {
                      setSelectedTime(newValue);
                      setValue("time", newValue.format("hh:mm A"));
                    }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        bgcolor: "success.",
                        color: "success.",
                        borderColor: "success.main",
                      },
                      "& .MuiInputBase-input": {
                        color: "success.main",
                      },
                      "& .MuiFormLabel-root": {
                        color: "success.main",
                      },
                      ":hover": {
                        boxShadow: 6,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "success.main",
                        },
                      },
                    }}
                  />
                </section>

                <section className="flex flex-col">
                  <label htmlFor="timeout">Finish-TIME</label>
                  <MobileTimePicker
                    {...register("timeout")}
                    name="timeout"
                    id="timeout"
                    closeOnSelect={closeOnSelectOption}
                    value={selectedTimeout}
                    onChange={(newValue) => {
                      setSelectedTimeout(newValue);
                      setValue("timeout", newValue.format("hh:mm A"));
                    }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        bgcolor: "success.",
                        color: "success.",
                        borderColor: "success.main",
                      },
                      "& .MuiInputBase-input": {
                        color: "success.main",
                      },
                      "& .MuiFormLabel-root": {
                        color: "success.main",
                      },

                      ":hover": {
                        boxShadow: 6,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "success.main",
                        },
                      },
                    }}
                  />
                </section>
              </>
            ) : null}

            <section>
              <label htmlFor="date">Date</label>
              <Input
                type="date"
                name="date"
                {...register("date")}
                defaultValue={defaultDate}
              />
            </section>

            <Button type="submit">Save</Button>
          </form>
        </CardComp>
      </div>
    </>
  );
}
