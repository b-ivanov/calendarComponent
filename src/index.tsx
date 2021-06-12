import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CalendarComponent from './components/CalendarComponent';
import EventDotProps from './interfaces/EventDotProps';

const eventsObj:EventDotProps[] = [{
  id: "asd_2",
  dateTime: new Date(2021, 5, 30),
  name: "Test event 2021/5/30",
  type: 0
}, {
  id: "asd_1",
  dateTime: new Date(2021, 5, 22),
  name: "Test event on 2021/5/22",
  type: 0,
  color: "#d35c27",
  description: "Trying out stuff.",
  category: "N/A"
}, {
  id: "asd_3",
  dateTime: new Date(2021, 5, 22),
  name: "Test event on 2021/5/22 (2)",
  type: 0,
  color: "#800080",
  description: "Trying out stuff.",
  category: "N/A"
}];
const startFrom:Date = new Date(2021, 5, 2);

ReactDOM.render(
  <React.StrictMode>
    <CalendarComponent events={eventsObj} startingDate={startFrom}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
