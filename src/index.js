import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CalendarComponent from './components/CalendarComponent';
import reportWebVitals from './reportWebVitals';

const testObj = {};
const startFrom= {
  year: 2021,
  month: 5,
  day: 2
};

ReactDOM.render(
  <React.StrictMode>
    <CalendarComponent events={testObj} startingDate={startFrom}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
