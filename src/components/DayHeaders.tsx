import React, { ReactElement } from 'react';

/**
 * Class component rendering the header of the calender with all day names.
 *
 * @class DayHeaders
 * @uses react
 * @author bivanov
 * @date 13/06/2021
 */
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