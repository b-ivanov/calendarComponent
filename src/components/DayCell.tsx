import React, { ReactElement } from 'react';
import EventDot from './EventDot';
import DayCellProps from '../interfaces/DayCellProps';
import EventDotProps from '../interfaces/EventDotProps';

/**
 * Class component rendering a single day cell from the calendar.
 *
 * @class DayCell
 * @uses react
 * @uses components/EventDot
 * @uses interfaces/DayCellProps
 * @uses interfaces/EventDotProps
 * @author bivanov
 * @date 13/06/2021
 */
class DayCell extends React.Component <DayCellProps> {
	/**
	 * Calls EventDot to render all event dots for the current day cell depending on its properties.
	 *
	 * @method renderDayEvents
	 * @param {EventDotProps[]|undefined}	events	Day events object
	 * @returns {Element[]|string}					Collection of all events
	 * @author bivanov
	 * @date 13/06/2021
	 */
	renderDayEvents (events:EventDotProps[]|undefined):Element[]|string {
		if (events) {
			return events.map((evt:EventDotProps, index:number):any => {
				return <EventDot id={evt.id} dateTime={evt.dateTime} name={evt.name} type={evt.type} color={evt.color} description={evt.description} category={evt.category} key={evt.id}/>;
			});
		} else {
			return "";
		}
	};

	/**
	 * Returns the day cell's CSS classes depending on its properties.
	 *
	 * @method getCellClasses
	 * @returns {string}		CSS classes
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getCellClasses ():string {
		const cls:string[] = ["dayCell"];
		if (this.props.isFromCurrentMonth) {
			cls.push("currentMonth");
		}
		if (this.props.isCurrentDay) {
			cls.push("currentDay");
		}
		return cls.join(" ");
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
		return (
			<li className={this.getCellClasses()}>
				<div>{this.props.dayNumber}</div>
				{ this.renderDayEvents(this.props.events) }
			</li>
		);
	};
};

export default DayCell;