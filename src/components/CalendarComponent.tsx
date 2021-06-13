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

	/**
	 * Method called when the component has mounted. Attaches event listeners for showing and hiding the event popup.
	 *
	 * @method componentDidMount
	 * @author bivanov
	 * @date 13/06/2021
	 */
	componentDidMount():void {
		//adding listener for showing the event popup
        Emitter.on('show_event_popup', (properties:ShowPopupProps) => {
			this.setState(() => ({
				showEventPopup: properties.coords,
				selectedEvent: properties.dotProps
			}));
		});
		//adding listener for hiding the event popup
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

	/**
	 * Method called before the component is unmounted. Removes event listeners for showing and hiding the event popup.
	 *
	 * @method componentWillUnmount
	 * @author bivanov
	 * @date 13/06/2021
	 */
    componentWillUnmount():void {
		//removing listeners for showing and hiding the event popup
        Emitter.off('show_event_popup', null);
        Emitter.off('hide_event_popup', null);
    }

	/**
	 * Returns an object of all events for the current month.
	 *
	 * @method getSortedEvents
	 * @param	{number}			year	Current year displayed on the calendar
	 * @param	{number}			month	Current month displayed on the calendar
	 * @returns {EventDotProps[][]}			An object of all events
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getSortedEvents (year:number, month:number):EventDotProps[][] {
		const sortedEvts:EventDotProps[][] = Array.from({ length: 31 }, () => []); //create an array for each day of the month
		if (this.props.events) {
			let currDate:Date;
			for (let e:number = 0; e < this.props.events.length; e++) { //populate the array depending on the event's date
				currDate = this.props.events[e].dateTime;
				if (currDate.getFullYear() === year && currDate.getMonth() === month) {
					sortedEvts[currDate.getDate()].push(this.props.events[e]);
				}
			}
		}
		return sortedEvts;
	};

	/**
	 * Returns the long month name with the current year for the subheader of the calendar.
	 *
	 * @method getMonthNameAndYear
	 * @returns {string}			Long month name with the current year
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getMonthNameAndYear ():string {
		const date:Date = new Date(this.state.year, this.state.month);
		const monthName = date.toLocaleString('default', { month: 'long' });
		return monthName + " " + this.state.year;
	};

	/**
	 * Returns a model for constructing the current month UI.
	 *
	 * @method getMonthObject
	 * @returns {DayCellProps[]}			Model of selected month
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getMonthObject ():DayCellProps[] {
		const now:Date = new Date();
		const today:number = now.getDate();
		const currDayFlag:boolean = (this.state.month === now.getMonth() && this.state.year === now.getFullYear());
		let firstDayIndex:number = (new Date(this.state.year, this.state.month, 1).getDay() - 1);
		let numOfCells:number = 35;
		if (firstDayIndex < 0) { //if firstDayIndex is less than 0, means we have a month with 1st day Sunday and we will need an additional row
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

	/**
	 * By a given month model calls the DayCell component to render the whole month.
	 *
	 * @method renderWholeMonth
	 * @param	{DayCellProps[]}	mntObj	Month model
	 * @returns {Element[]}					An array of all day cells
	 * @author bivanov
	 * @date 13/06/2021
	 */
	renderWholeMonth (mntObj:DayCellProps[]):ReactElement[] {
		return mntObj.map((dayObj:DayCellProps, index:number):any => {
			return <DayCell dayNumber={dayObj.dayNumber} isFromCurrentMonth={dayObj.isFromCurrentMonth} isCurrentDay={dayObj.isCurrentDay} events={dayObj.events} key={"dc_" + index}/>;
		});
	};

	/**
	 * Renders the current month.
	 *
	 * @method setCurrentMonth
	 * @author bivanov
	 * @date 13/06/2021
	 */
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

	/**
	 * Renders the next month.
	 *
	 * @method incrementMonth
	 * @author bivanov
	 * @date 13/06/2021
	 */
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

	/**
	 * Renders the previous month.
	 *
	 * @method decrementMonth
	 * @author bivanov
	 * @date 13/06/2021
	 */
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

	/**
	 * Entrypoint and main render function of the component.
	 *
	 * @method render
	 * @returns {ReactElement}	Component body
	 * @author bivanov
	 * @date 13/06/2021
	 */
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