import React from 'react';
// import AppUtils from '../app-utils';

/**The CalendarComponent component renders the outer shell of the table */
class CalendarComponent extends React.Component {
	/**Component render function */
	render () {
		return (
			<div className="calendarShell">
				<h1>Calendar</h1>
				<div className="subHeader">
					<div className="monthName">January 2021</div>
					<div className="navigation">
						<span>&#10094;</span>
						<span>&#10095;</span>
					</div>
				</div>
				<ul className="monthGrid">
					<li className="dayCell">1</li>
					<li className="dayCell">2</li>
					<li className="dayCell">3</li>
					<li className="dayCell">4</li>
					<li className="dayCell">5</li>
					<li className="dayCell">6</li>
					<li className="dayCell">7</li>
					<li className="dayCell">8</li>
					<li className="dayCell">9</li>
					<li className="dayCell">10</li>
				</ul>
			</div>
		);
	}
};

export default CalendarComponent;