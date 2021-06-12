import React from 'react';
import EventDotProps from '../interfaces/EventDotProps';

/**The DayCell component renders the outer shell of the table */
class EventDot extends React.Component <EventDotProps> {
	/**Component render function */
	render () {
		return (
			<span id={this.props.id} className="eventDot" title={this.props.name} style={{color: (this.props.color || "var(--green-event-color)")}}>&#8226;</span>
		);
	};
};

export default EventDot;