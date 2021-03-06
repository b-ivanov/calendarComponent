import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { data } from './example_calendar_data';
import CalendarComponent from './components/CalendarComponent';
import EventDotProps from './interfaces/EventDotProps';

const eventsObj:EventDotProps[] = data;
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
