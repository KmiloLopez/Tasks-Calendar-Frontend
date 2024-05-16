import React, {useState, useEffect, useContext} from 'react';
import { DateCalendar} from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import {SelectedDateContext} from '../../context/selectDayContext.jsx';
import { Link } from "react-router-dom";

import WysiwygIcon from '@mui/icons-material/Wysiwyg';

import dayjs from 'dayjs' // ES 2015
import { getTasksRequestByDate } from '../../api/tasks.js';
dayjs().format()


function ServerDay(props) {// from MUI documentation
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
	const isSelected =
	  !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
	return (
	  <Badge
		key={props.day.toString()}
		overlap="circular"
		badgeContent={isSelected ? <WysiwygIcon/> : undefined}
		anchorOrigin={{//icon location
			vertical: 'top',
			horizontal: 'left',
		  }}
        
	  >
		<PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
	  </Badge>
	);
  }

const CalendarMUI = () => {
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    const { dayselected, setDaySelected } = useContext(SelectedDateContext);
    const [displayDate, setDisplayDate] = useState(0);
  const test = {
    $D:"5"
  }
  
 
   const printDate =(dayselectedCalendar)=>{
        const valuesArray = Object.values(dayselectedCalendar);
        setDaySelected(dayselectedCalendar);
        const newt= JSON.stringify(valuesArray[2]).split('T')[0].slice(1);
      
        setDisplayDate(newt);
        console.log("new date",newt);
        //getTasksRequestByDate(newt);
     
   }
    
  
  return (
    <>
    <DateCalendar onChange={printDate} 
				slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}/>
        
    </>
  )
}

export default CalendarMUI

