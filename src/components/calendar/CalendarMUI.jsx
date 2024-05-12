import React, {useState, useEffect} from 'react';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import ShortTextIcon from '@mui/icons-material/ShortText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

import dayjs from 'dayjs' // ES 2015
dayjs().format()

//AHORA SI ESTO SOLO LO VEO EN CALENDAR-DAY-STATE
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
    const [daySelected, setdaySelected] = useState(new Date());
//comentario agregado en calendar-day-state
    let date = daySelected.$d
    console.log(typeof(date)) 

    useEffect(() =>{
        console.log("uasdofan", daySelected.$d)
    },[daySelected])
  
  return (
    <DateCalendar onChange={setdaySelected} 
				slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}/>
  )
}

export default CalendarMUI