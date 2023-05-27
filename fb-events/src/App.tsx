import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EventContainer from './components/EventContainer';

function App() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    fetch('./events.json')
      .then(res => res.json())
      .then(data => {
        const parsedData = data.map((event: any) => (event.node))
        setEvents(parsedData)
        console.log(parsedData)
      }
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Facebook Events in SF Today</h1>
        <div className='event-container'>
          <EventContainer events={events} />
        </div>
      </header>
    </div>
  );
}

export default App;
