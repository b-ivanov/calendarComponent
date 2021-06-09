import React from 'react';

interface DayCellProps {
    dayNumber: number;
	isFromCurrentMonth: boolean;
};

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