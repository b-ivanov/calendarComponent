import React, { ReactElement } from 'react';
import EventPopupProps from '../interfaces/EventPopupProps';

/**The DayCell component renders the outer shell of the table */
class EventPopup extends React.Component <EventPopupProps> {
	getDate ():string {
		const options:{} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return this.props.dateTime.toLocaleDateString('default', options);
	};
	/**Component render function */
	render ():ReactElement {
		return (
			<div className="eventPopup">
				<div className="headerDiv" style={{backgroundColor: this.props.color}}>
					<span>{this.props.name}</span>
					<span className="closePopup">&#10006;</span>
				</div>
				<ul className="contentUl"  style={{fill: this.props.color}}>
					<li>
						<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
							<path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
							<path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
							<path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
							<path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
							<path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
						</svg>
						<span>{this.getDate()}</span>
					</li>
					<li>
						<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
							<path d="M16,12a2,2,0,1,1,2-2A2,2,0,0,1,16,12Zm0-2Z" />
							<path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
							<path d="M16,24a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0v6A2,2,0,0,1,16,24Zm0-8v0Z" />
						</svg>
						<span>{this.props.description}</span>
					</li>
					<li>
						<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
							<path d="M26,25H6a3,3,0,0,1-3-3V20a1,1,0,0,1,1-1,3,3,0,0,0,0-6,1,1,0,0,1-1-1V10A3,3,0,0,1,6,7H26a3,3,0,0,1,3,3v2a1,1,0,0,1-1,1,3,3,0,0,0,0,6,1,1,0,0,1,1,1v2A3,3,0,0,1,26,25ZM5,20.9V22a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V20.9a5,5,0,0,1,0-9.8V10a1,1,0,0,0-1-1H6a1,1,0,0,0-1,1v1.1a5,5,0,0,1,0,9.8Z" />
						</svg>
						<span>{this.props.category}</span>
					</li>
				</ul>
			</div>
		);
	};
};

export default EventPopup;