import React, { useEffect, useState } from "react";
import "./App.scss";
import Event from "./components/Event";

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("./events.json")
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.map((event: any) => event.node);
        setEvents(parsedData);
        console.log(parsedData);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Facebook Events in SF Today</h1>
        <div className="event-container">
          {events.map((event: any) => (
            <Event event={event} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
