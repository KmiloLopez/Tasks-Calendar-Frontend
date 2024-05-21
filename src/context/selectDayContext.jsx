import { createContext, useState } from "react";

import dayjs from "dayjs"; // ES 2015
dayjs().format();

export const SelectedDateContext = createContext();

export function SelectDayProvider({ children }) {
  const [dayselected, setDaySelected] = useState(new Date());
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

  return (
    <SelectedDateContext.Provider
      value={{
        // este es el retorno o lo que exporta
        dayselected,
        selectedMonthYear,
        setDaySelected,
        setSelectedMonthYear,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
}
