import { createContext, useContext, useState } from "react";
import {
  
  getTasksRequest,

} from "../api/tasks";
import dayjs from 'dayjs' // ES 2015
dayjs().format()

export const SelectedDateContext = createContext();

export const useTasks = () => {
  const context = useContext(SelectedDateContext);
  if (!context) throw new Error("useTasks must be used within a SelectDayProvider");
  return context;
};

export function SelectDayProvider({ children }) {
  const [dayselected, setDayselected] = useState(new Date());

  const getTasks = async () => {
    const res = await getTasksRequest();
    setDayselected(res.data);
  };



  return (
    <SelectedDateContext.Provider
      value={{// este es el retorno o lo que exporta
        dayselected,
        setDayselected,
        
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
}
