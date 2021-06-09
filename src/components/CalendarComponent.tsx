import React from 'react';
import DayHeaders from './DayHeaders';
import DayCell from './DayCell';
import CalendarComponentProps from '../interfaces/CalendarComponentProps';
import DayCellProps from '../interfaces/DayCellProps';

/**The CalendarComponent component renders the outer shell of the table */
class CalendarComponent extends React.Component <CalendarComponentProps> {
	year:number;
	month:number;
	day:number;
	dateObject:Date;

	constructor (props:CalendarComponentProps) {
		super(props);
		const now:Date = new Date();
		this.year = (props.startingDate ? props.startingDate.year : now.getFullYear());
		this.month = (props.startingDate ? props.startingDate.month : now.getMonth());
		this.day = (props.startingDate ? props.startingDate.day : now.getDate());
		this.dateObject = new Date(this.year, this.month, this.day);
	}

	getMonthNameAndYear ():string {
		const monthName = this.dateObject.toLocaleString('default', { month: 'long' });
		return monthName + " " + this.year;
	};

	getMonthObject ():DayCellProps[] {
		const firstDayIndex:number = (new Date(this.year, this.month, 1).getDay() - 1);
		const finalDay:number = (32 - new Date(this.year, this.month, 32).getDate());
		const finalDayPrevMonth:number = (32 - new Date(this.year, (this.month - 1), 32).getDate());
		console.log("finalDayPrevMonth", finalDayPrevMonth, firstDayIndex);
		const outObject:DayCellProps[] = [];
		const numOfCells:number = 35;
		for (let i = (1 - firstDayIndex); i <= (numOfCells - firstDayIndex); i++) {
			if (i < 1) { //previous month cells
				outObject.push({
					dayNumber: finalDayPrevMonth + i,
					isFromCurrentMonth: false
				});
			} else if (i <= finalDay) { //current month cells
				outObject.push({
					dayNumber: i,
					isFromCurrentMonth: true
				});
			} else { //next month cells
				outObject.push({
					dayNumber: i - finalDay,
					isFromCurrentMonth: false
				});
			}
		}
		return outObject;
	};
	renderWholeMonth (mntObj:DayCellProps[]):Element[] {
		return mntObj.map((dayObj:DayCellProps, index:number):any => {
			return <DayCell dayNumber={dayObj.dayNumber} isFromCurrentMonth={dayObj.isFromCurrentMonth} key={"dc_" + index}/>;
		});
	}
	/**Component render function */
	render () {
		const monthObj:DayCellProps[] = this.getMonthObject();
		return (
			<div className="calendarShell">
				<h1>Calendar</h1>
				<div className="subHeader">
					<div className="monthName">{this.getMonthNameAndYear()}</div>
					<div className="navigation">
						<span>&#10094;</span>
						<span>&#10095;</span>
					</div>
				</div>
				<ul className="monthGrid">
					<DayHeaders/>
					{ this.renderWholeMonth(monthObj) }
				</ul>
			</div>
		);
	}
};

export default CalendarComponent;