import React from 'react';
import DayHeaders from './DayHeaders';
import DayCell from './DayCell';
import CalendarComponentProps from '../interfaces/CalendarComponentProps';
import CalendarComponentState from '../interfaces/CalendarComponentState';
import DayCellProps from '../interfaces/DayCellProps';

/**The CalendarComponent component renders the outer shell of the table */
class CalendarComponent extends React.Component <CalendarComponentProps, CalendarComponentState> {
	constructor (props:CalendarComponentProps) {
		super(props);
		const now:Date = new Date();
		this.state = {
			year: (props.startingDate ? props.startingDate.year : now.getFullYear()),
			month: (props.startingDate ? props.startingDate.month : now.getMonth()),
			day: (props.startingDate ? props.startingDate.day : now.getDate())
		};
	};

	getMonthNameAndYear ():string {
		const date:Date = new Date(this.state.year, this.state.month, this.state.day);
		const monthName = date.toLocaleString('default', { month: 'long' });
		return monthName + " " + this.state.year;
	};

	getMonthObject ():DayCellProps[] {
		const firstDayIndex:number = (new Date(this.state.year, this.state.month, 1).getDay() - 1);
		const finalDay:number = (32 - new Date(this.state.year, this.state.month, 32).getDate());
		const finalDayPrevMonth:number = (32 - new Date(this.state.year, (this.state.month - 1), 32).getDate());
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
	};
	
	incrementMonth ():void {
		let tempMonth:number = this.state.month;
		let tempYear:number = this.state.year;
		tempMonth++;
		if (tempMonth > 11) {
			tempMonth = 0;
			tempYear++;
		}
		this.setState({
			year: tempYear,
			month: tempMonth,
			day: this.state.day
		});
	};

	decrementMonth ():void {
		let tempMonth:number = this.state.month;
		let tempYear:number = this.state.year;
		tempMonth--;
		if (tempMonth < 0) {
			tempMonth = 11;
			tempYear--;
		}
		this.setState({
			year: tempYear,
			month: tempMonth,
			day: this.state.day
		});
	};
	/**Component render function */
	render () {
		const monthObj:DayCellProps[] = this.getMonthObject();
		return (
			<div className="calendarShell">
				<h1>Calendar</h1>
				<div className="subHeader">
					<div className="monthName">{this.getMonthNameAndYear()}</div>
					<div className="navigation">
						<span onClick={() => this.decrementMonth()}>&#10094;</span>
						<span onClick={() => this.incrementMonth()}>&#10095;</span>
					</div>
				</div>
				<ul className="monthGrid">
					<DayHeaders/>
					{ this.renderWholeMonth(monthObj) }
				</ul>
			</div>
		);
	};
};

export default CalendarComponent;