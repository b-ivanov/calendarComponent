import React, { ReactElement } from 'react';
import DayHeaders from './DayHeaders';
import DayCell from './DayCell';
import EventPopup from './EventPopup';
import CalendarComponentProps from '../interfaces/CalendarComponentProps';
import CalendarComponentState from '../interfaces/CalendarComponentState';
import DayCellProps from '../interfaces/DayCellProps';
import EventDotProps from '../interfaces/EventDotProps';
import ShowPopupProps from '../interfaces/ShowPopupProps';
import Emitter from '../services/emitter';

/**
 * Main class component of the application. Renders the container for the calendar and houses its functionalities.
 *
 * @class CalendarComponent
 * @uses react
 * @uses components/DayHeaders
 * @uses components/DayCell
 * @uses components/EventPopup
 * @uses interfaces/CalendarComponentProps
 * @uses interfaces/CalendarComponentState
 * @uses interfaces/DayCellProps
 * @uses interfaces/EventDotProps
 * @uses interfaces/ShowPopupProps
 * @uses services/emitter
 * @author bivanov
 * @date 13/06/2021
 */
class CalendarComponent extends React.Component <CalendarComponentProps, CalendarComponentState> {
	constructor (props:CalendarComponentProps) {
		super(props);
		let date:Date = (props.startingDate || new Date());
		const year:number = date.getFullYear();
		const month:number = date.getMonth();
		this.state = {
			sortedEvents: this.getSortedEvents(year, month),
			year: year,
			month: month,
			day: date.getDate(),
			showEventPopup: {
				isVisible: false,
				x: 0,
				y: 0
			},
			selectedEvent: null
		};
	};

	componentDidMount():void {
        Emitter.on('show_event_popup', (properties:ShowPopupProps) => {
			this.setState(() => ({
				showEventPopup: properties.coords,
				selectedEvent: properties.dotProps
			}));
		});

        Emitter.on('hide_event_popup', () => {
			this.setState(() => ({
				showEventPopup: {
					isVisible: false,
					x: 0,
					y: 0
				},
				selectedEvent: null
			}));
		});
    }

    componentWillUnmount():void {
        Emitter.off('show_event_popup', null);
        Emitter.off('hide_event_popup', null);
    }

	getSortedEvents (year:number, month:number):EventDotProps[][] {
		const sortedEvts:EventDotProps[][] = Array.from({ length: 31 }, () => []);
		if (this.props.events) {
			let currDate:Date;
			for (let e:number = 0; e < this.props.events.length; e++) {
				currDate = this.props.events[e].dateTime;
				if (currDate.getFullYear() === year && currDate.getMonth() === month) {
					sortedEvts[currDate.getDate()].push(this.props.events[e]);
				}
			}
		}
		return sortedEvts;
	};

	getMonthNameAndYear ():string {
		const date:Date = new Date(this.state.year, this.state.month);
		const monthName = date.toLocaleString('default', { month: 'long' });
		return monthName + " " + this.state.year;
	};

	getMonthObject ():DayCellProps[] {
		const now:Date = new Date();
		const today:number = now.getDate();
		const currDayFlag:boolean = (this.state.month === now.getMonth() && this.state.year === now.getFullYear());
		let firstDayIndex:number = (new Date(this.state.year, this.state.month, 1).getDay() - 1);
		let numOfCells:number = 35;
		if (firstDayIndex < 0) {
			firstDayIndex = 6;
			numOfCells = 42;
		}
		const finalDay:number = (32 - new Date(this.state.year, this.state.month, 32).getDate());
		const finalDayPrevMonth:number = (32 - new Date(this.state.year, (this.state.month - 1), 32).getDate());
		const outObject:DayCellProps[] = [];
		for (let i:number = (1 - firstDayIndex); i <= (numOfCells - firstDayIndex); i++) {
			if (i < 1) { //previous month cells
				outObject.push({
					dayNumber: finalDayPrevMonth + i,
					isFromCurrentMonth: false,
					isCurrentDay: false,
					events: []
				});
			} else if (i <= finalDay) { //current month cells
				outObject.push({
					dayNumber: i,
					isFromCurrentMonth: true,
					isCurrentDay: (i === today && currDayFlag),
					events: this.state.sortedEvents[i]
				});
			} else { //next month cells
				outObject.push({
					dayNumber: i - finalDay,
					isFromCurrentMonth: false,
					isCurrentDay: false,
					events: []
				});
			}
		}
		return outObject;
	};

	renderWholeMonth (mntObj:DayCellProps[]):Element[] {
		return mntObj.map((dayObj:DayCellProps, index:number):any => {
			return <DayCell dayNumber={dayObj.dayNumber} isFromCurrentMonth={dayObj.isFromCurrentMonth} isCurrentDay={dayObj.isCurrentDay} events={dayObj.events} key={"dc_" + index}/>;
		});
	};
	
	setCurrentMonth ():void {
		const now:Date = new Date();
		const year:number = now.getFullYear();
		const month:number = now.getMonth();
		this.setState({
			year: year,
			month: month,
			day: now.getDay(),
			sortedEvents: this.getSortedEvents(year, month),
			showEventPopup: {
				isVisible: false,
				x: 0,
				y: 0
			}
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
			day: this.state.day,
			sortedEvents: this.getSortedEvents(tempYear, tempMonth),
			showEventPopup: {
				isVisible: false,
				x: 0,
				y: 0
			}
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
			day: this.state.day,
			sortedEvents: this.getSortedEvents(tempYear, tempMonth),
			showEventPopup: {
				isVisible: false,
				x: 0,
				y: 0
			}
		});
	};

	/**Component render function */
	render ():ReactElement {
		const monthObj:DayCellProps[] = this.getMonthObject();
		return (
			<div className="calendarShell">
				<h1>Calendar</h1>
				<div className="subHeader">
					<div className="monthName">{this.getMonthNameAndYear()}</div>
					<div className="navigation">
						<span onClick={() => this.decrementMonth()}>&#10094;</span>
						<span className="todayBtn" onClick={() => this.setCurrentMonth()}>Today</span>
						<span onClick={() => this.incrementMonth()}>&#10095;</span>
					</div>
				</div>
				<ul className="monthGrid">
					<DayHeaders/>
					{ this.renderWholeMonth(monthObj) }
				</ul>
				<EventPopup styleProperties={this.state.showEventPopup} eventObject={this.state.selectedEvent}/>
			</div>
		);
	};
};

export default CalendarComponent;