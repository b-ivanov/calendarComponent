import React, { ReactElement } from 'react';
import EventDotProps from '../interfaces/EventDotProps';
import Emitter from '../services/emitter';

/**
 * Class component rendering a single event dot in a dell cell. Emits an event for openning the event popup.
 *
 * @class EventDot
 * @uses react
 * @uses interfaces/EventDotProps
 * @uses services/emitter
 * @author bivanov
 * @date 13/06/2021
 */
class EventDot extends React.Component <EventDotProps> {
	callShowPopup (evt:React.MouseEvent):void {
		Emitter.emit('show_event_popup', {
			dotProps: this.props,
			coords: {
				isVisible: true,
				x: evt.clientX,
				y: evt.clientY
			}
		});
	};

	/**Component render function */
	render ():ReactElement {
		return (
			<span id={this.props.id} className="eventDot" onClick={(event) => { this.callShowPopup(event) }} title={this.props.name} style={{color: (this.props.color || "var(--green-event-color)")}}>&#8226;</span>
		);
	};
};

export default EventDot;