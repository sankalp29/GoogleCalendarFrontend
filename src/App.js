import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './util'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className='h-screen flex flex-col'>
        <CalendarHeader />
          <div className='flex flex-1'>
            <Sidebar />
            <Month month={currentMonth}/>
          </div>
      </div>
    </React.Fragment>
  );
}

export default App;
/**
In React, a component must return a single parent element.
For example, this will ❌ cause an error:
return (
  <h1>Hello</h1>
  <p>World</p>
);

return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
Works, but adds an extra <div> to the DOM unnecessarily — which can mess up your layout or CSS in complex UIs.

A React.Fragment lets you group multiple elements without adding an extra DOM node.
*/