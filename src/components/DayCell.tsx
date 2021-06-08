import React from 'react';

interface DayCellProps {
    dayNumber: number;
};

/**The DayCell component renders the outer shell of the table */
class DayCell extends React.Component <DayCellProps> {
	/**Component render function */
	render () {
		return (
			<li className="dayCell">
				<span>{this.props.dayNumber}</span>
			</li>
		);
	}
};

export default DayCell;