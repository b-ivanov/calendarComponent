import React, { ReactElement } from 'react';

/**The DayHeaders component renders the outer shell of the table */
class DayHeaders extends React.Component {
	/**Component render function */
	render ():ReactElement[] {
		const dayNames:string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		return dayNames.map((day:string, index:number):ReactElement => {
			return <li className="dayHeader" key={"dh_" + index}>{day}</li>;
		});
	};
};

export default DayHeaders;