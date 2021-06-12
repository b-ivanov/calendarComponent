import React, { ReactElement } from 'react';
import EventDotProps from '../interfaces/EventDotProps';
import Emitter from '../services/emitter';

/**The DayCell component renders the outer shell of the table */
class EventDot extends React.Component <EventDotProps> {
	/**Component render function */
	render ():ReactElement {
		return (
			<span id={this.props.id} className="eventDot" onClick={() => { Emitter.emit('show_event_popup', this.props); }} title={this.props.name} style={{color: (this.props.color || "var(--green-event-color)")}}>&#8226;</span>
		);
	};
};

export default EventDot;