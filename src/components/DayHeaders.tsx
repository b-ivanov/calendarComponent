import React from 'react';

/**The DayHeaders component renders the outer shell of the table */
class DayHeaders extends React.Component {
	/**Component render function */
	render () {
		const dayNames:string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		return dayNames.map((day:string, index:number):any => {
			return <li className="dayHeader" key={"dh_" + index}>{day}</li>;
		});
	};
};

export default DayHeaders;