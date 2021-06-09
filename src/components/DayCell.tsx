import React from 'react';
import DayCellProps from '../interfaces/DayCellProps';

/**The DayCell component renders the outer shell of the table */
class DayCell extends React.Component <DayCellProps> {
	getCellClasses ():string {
		const cls:string[] = ["dayCell"];
		if (this.props.isFromCurrentMonth) {
			cls.push("current");
		}
		return cls.join(" ");
	};
	/**Component render function */
	render () {
		return (
			<li className={this.getCellClasses()}>
				<span>{this.props.dayNumber}</span>
			</li>
		);
	};
};

export default DayCell;