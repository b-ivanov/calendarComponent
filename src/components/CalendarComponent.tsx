import React from 'react';
import DayCell from './DayCell';

interface CalendarComponentProps {
    events: [];
    startingDate: {
		year: number,
		month: number,
		day: number
	};
}

interface DayObject {
    day: number;
};


/**The CalendarComponent component renders the outer shell of the table */
class CalendarComponent extends React.Component <CalendarComponentProps> {
	year:number;
	month:number;
	day:number;

	constructor (props:CalendarComponentProps) {
		super(props);
		const now:Date = new Date();
		this.year = (props.startingDate ? props.startingDate.year : now.getFullYear());
		this.month = (props.startingDate ? props.startingDate.month : now.getMonth());
		this.day = (props.startingDate ? props.startingDate.day : now.getDate());
	}

	getMonthObject ():DayObject[] {
		const firstDayIndex:number = (new Date(this.year, this.month, 1).getDay() - 1);
		const finalDay:number = (32 - new Date(this.year, this.month, 32).getDate());
		const outObject:DayObject[] = [];
		const numOfCells:number = 35;
		console.log(finalDay);
		for (let i = (1 - firstDayIndex); i <= (numOfCells - firstDayIndex); i++) {
			if (i < 1) { //previous month cells
				outObject.push({
					day: 33
				});
			} else if (i <= finalDay) { //current month cells
				outObject.push({
					day: i
				});
			} else { //next month cells
				outObject.push({
					day: i - finalDay
				});
			}
		}
		return outObject;
	};
	renderWholeMonth (mntObj:DayObject[]):Element[] {
		return mntObj.map((dayObj:DayObject):any => {
			return <DayCell dayNumber={dayObj.day} key={dayObj.day}/>;
		});
	}
	/**Component render function */
	render () {
		const monthObj:DayObject[] = this.getMonthObject();
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
					{ this.renderWholeMonth(monthObj) }
				</ul>
			</div>
		);
	}
};

export default CalendarComponent;