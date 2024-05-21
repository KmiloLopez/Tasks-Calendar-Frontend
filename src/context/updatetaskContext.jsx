import { createContext, useState } from "react";

import dayjs from 'dayjs' // ES 2015
dayjs().format()

export const UpdateTaskContext = createContext();


export function UpdateTaskCProvider({ children }) {
  const [taskStatus, setTaskStatus] = useState(false);

 
  return (
    <UpdateTaskContext.Provider
      value={{// este es el retorno o lo que exporta
        taskStatus,
        setTaskStatus
      
        
      }}
    >
      {children}
    </UpdateTaskContext.Provider>
  );
}
