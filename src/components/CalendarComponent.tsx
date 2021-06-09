import React from 'react';
import DayHeaders from './DayHeaders';
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
	isFromCurrMnth: boolean;
};


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

	getMonthObject ():DayObject[] {
		const firstDayIndex:number = (new Date(this.year, this.month, 1).getDay() - 1);
		const finalDay:number = (32 - new Date(this.year, this.month, 32).getDate());
		const finalDayPrevMonth:number = (32 - new Date(this.year, (this.month - 1), 32).getDate());
		console.log("finalDayPrevMonth", finalDayPrevMonth, firstDayIndex);
		const outObject:DayObject[] = [];
		const numOfCells:number = 35;
		for (let i = (1 - firstDayIndex); i <= (numOfCells - firstDayIndex); i++) {
			if (i < 1) { //previous month cells
				outObject.push({
					day: finalDayPrevMonth + i,
					isFromCurrMnth: false
				});
			} else if (i <= finalDay) { //current month cells
				outObject.push({
					day: i,
					isFromCurrMnth: true
				});
			} else { //next month cells
				outObject.push({
					day: i - finalDay,
					isFromCurrMnth: false
				});
			}
		}
		return outObject;
	};
	renderWholeMonth (mntObj:DayObject[]):Element[] {
		return mntObj.map((dayObj:DayObject, index:number):any => {
			return <DayCell dayNumber={dayObj.day} isFromCurrentMonth={dayObj.isFromCurrMnth} key={"dc_" + index}/>;
		});
	}
	/**Component render function */
	render () {
		const monthObj:DayObject[] = this.getMonthObject();
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