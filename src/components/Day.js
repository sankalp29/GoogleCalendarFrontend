import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

export default function Day({day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {setDaySelected, setShowEventModal, savedEvents} = useContext(GlobalContext)
  useEffect(() => {
    const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [savedEvents])
  
  function getCurrentDayClass() {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
  }
  
  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>  
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
          
      </div>
    </div>
  )
}
