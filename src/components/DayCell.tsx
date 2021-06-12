import React from 'react';
import EventDot from './EventDot';
import DayCellProps from '../interfaces/DayCellProps';
import EventDotProps from '../interfaces/EventDotProps';

/**The DayCell component renders the outer shell of the table */
class DayCell extends React.Component <DayCellProps> {
	renderDayEvents (events:EventDotProps[]|undefined):Element[]|string {
		if (events) {
			return events.map((evt:EventDotProps, index:number):any => {
				return <EventDot id={evt.id} dateTime={evt.dateTime} name={evt.name} type={evt.type} key={"evt_" + index} />;
			});
		} else {
			return "";
		}
	};
	
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
	/**Component render function */
	render () {
		return (
			<li className={this.getCellClasses()}>
				<div>{this.props.dayNumber}</div>
				{ this.renderDayEvents(this.props.events) }
			</li>
		);
	};
};

export default DayCell;