import React, { useState, useEffect, useContext } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { SelectedDateContext } from "../../context/selectDayContext.jsx";
import { Link } from "react-router-dom";

import WysiwygIcon from "@mui/icons-material/Wysiwyg";

import dayjs from "dayjs"; // ES 2015
import { getTasksRequestByDate } from "../../api/tasks.js";
dayjs().format();

function ServerDay(props) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    onBadgeClick,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <WysiwygIcon
            onClick={() => onBadgeClick(day)}
            sx={{
              width: 20,
              color: "success.main",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        ) : undefined
      }
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const CalendarMUI = ({ daysonmonth }) => {
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const { dayselected, setDaySelected, setSelectedMonthYear } =
    useContext(SelectedDateContext);
  const [displayDate, setDisplayDate] = useState(0);

  useEffect(() => {
    if (daysonmonth) {
      setHighlightedDays(daysonmonth);
    }
  }, [daysonmonth]);

  const printDate = (dayselectedCalendar) => {
    const valuesArray = Object.values(dayselectedCalendar);
    setDaySelected(dayselectedCalendar);
    const newt = JSON.stringify(valuesArray[2]).split("T")[0].slice(1);

    setDisplayDate(newt);
    console.log("new date", newt);
  };

  const handleMonthChange = (date) => {
    setSelectedMonthYear(date.$d);
  };

  return (
    <DateCalendar
      sx={{
        "& .MuiPickersDay-today": {
          borderColor: "success.main",
        },
        "& .MuiPickersDay-root.Mui-selected": {
          backgroundColor: "success.hover",
          color: "white",
          "&:hover": {
            backgroundColor: "success.main",
          },
        },
        "& .MuiPickersDay-root": {
          //color: "white",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "success.main",
          },
        },
        "& .MuiDayCalendar-weekDayLabel": {
          fontSize: "1rem",
          //color: "white",
        },
        "& .MuiPickersCalendarHeader-label": {
          fontSize: "1.5rem",
          color: "#173A5E",
        },
      }}
      onMonthChange={handleMonthChange}
      onChange={printDate}
      slots={{
        day: ServerDay,
      }}
      slotProps={{
        day: {
          highlightedDays,
          onBadgeClick: printDate,
        },
      }}
    />
  );
};

export default CalendarMUI;
