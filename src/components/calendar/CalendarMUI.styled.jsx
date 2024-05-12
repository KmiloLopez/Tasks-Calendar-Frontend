import React, {useState, useEffect, useContext} from 'react';
import { DateCalendar} from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import {SelectedDateContext} from '../../context/selectDayContext.jsx';

import WysiwygIcon from '@mui/icons-material/Wysiwyg';

import dayjs from 'dayjs' // ES 2015
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
 const [dayy, setDayy] = useState(new Date())
    let date = dayselected.$d
    console.log(typeof(date)) 

    useEffect(() =>{
        console.log("uasdofan", dayy)

    },[dayselected])
  
  return (
    <DateCalendar onChange={setDayy} 
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