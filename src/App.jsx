// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [schedule, setSchedule] = useState([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (savedSchedule) {
      setSchedule(savedSchedule);
    }
  }, []);

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  const addSubject = () => {
    if (subject && hours) {
      const newSchedule = [...schedule, { subject, hours: parseInt(hours) }];
      setSchedule(newSchedule);
      setSubject('');
      setHours('');
    }
  };

  const incrementHours = (index) => {
    const newSchedule = schedule.map((item, i) => {
      if (i === index) {
        return { ...item, hours: item.hours + 1 };
      }
      return item;
    });
    setSchedule(newSchedule);
  };

  const decrementHours = (index) => {
    const newSchedule = schedule.map((item, i) => {
      if (i === index && item.hours > 0) {
        return { ...item, hours: item.hours - 1 };
      }
      return item;
    });
    setSchedule(newSchedule);
  };

  return (
    <div className="app-container">
      <h1>Geekster Education Planner</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button onClick={addSubject} className='addColor'>Add</button>
      </div>
      <div className="schedule-container">
        {schedule.map((item, index) => (
          <div key={index} className="subject-item">
            <span>
              {item.subject} - {item.hours} hours
            </span>
            <button className="plus-button" onClick={() => incrementHours(index)}>+</button>
            <button className="minus-button" onClick={() => decrementHours(index)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

