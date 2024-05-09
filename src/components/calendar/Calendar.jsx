import { useState } from "react";


export function Calendar({ task }) {
 
    const [selectedMonth, setSelectedMonth] = useState(new Date());//new Date() creacion de instancia para la fecha  con la fecha actual de donde se corre el codigo

    const handleNextMonth = () => {
        setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
    };

    const handlePreviousMonth = () => {
        setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
    };

    const handleDayClick = (day) => {
        console.log('Selected date:', `${day}/${selectedMonth.getMonth() + 1}/${selectedMonth.getFullYear()}`);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartingDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    };

    const daysInMonth = getDaysInMonth(selectedMonth.getFullYear(), selectedMonth.getMonth());
    const startingDayOfMonth = getStartingDayOfMonth(selectedMonth.getFullYear(), selectedMonth.getMonth());
    const monthName = selectedMonth.toLocaleString('default', { month: 'long' });
    const yearNumber = selectedMonth.getFullYear();

    const renderDays = () => {
        let dayCount = 1 - startingDayOfMonth;
        let days = ["SUN","MON","TUS","WED","THU","FRI","SAT"];
        for (let i = 0; i < 6; i++) {//maximo de filas necesarias para mostrar dias
            for (let j = 0; j < 7; j++) {// numero de columnas (dias de la semana)
                const dayKey = i * 7 + j;
                if (dayCount > 0 && dayCount <= daysInMonth) {
                    days.push(dayCount);
                } else {
                    days.push(null); // Add null for empty cells
                }
                dayCount++;
            }
        }
        return days;
    };

    return (
        <div className="calendar">
            <div className="navigation">
                <button onClick={handlePreviousMonth}>Previous</button>
                <div>{monthName} {yearNumber}</div>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="days-grid">
                {renderDays().map((day, index) => (
                    day !== null ? (
                        <div key={index} className="box day" onClick={() => handleDayClick(day)}>
                            {day}
                        </div>
                    ) : (
                        <div key={index} className="box empty"></div>
                    )
                ))}
            </div>
        </div>
    );
}