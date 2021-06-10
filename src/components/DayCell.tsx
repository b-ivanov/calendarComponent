import React from 'react';
import DayCellProps from '../interfaces/DayCellProps';

/**The DayCell component renders the outer shell of the table */
class DayCell extends React.Component <DayCellProps> {
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
				<span className="eventDot">&#8226;</span>
			</li>
		);
	};
};

export default DayCell;