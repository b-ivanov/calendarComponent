import React, { ReactElement } from 'react';
import EventPopupProps from '../interfaces/EventPopupProps';
import PopupContainerStyles from '../interfaces/PopupContainerStyles';
import Emitter from '../services/emitter';

/**
 * Class component rendering the evnt popup to show detailed information for a selected event.
 *
 * @class EventPopup
 * @uses react
 * @uses interfaces/EventPopupProps
 * @uses interfaces/PopupContainerStyles
 * @uses services/emitter
 * @author bivanov
 * @date 13/06/2021
 */
class EventPopup extends React.Component <EventPopupProps> {
	/**
	 * Generates the event date, displaying the month full name, date and year.
	 *
	 * @method getDate
	 * @return {string}		Event date
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getDate ():string {
		if (this.props.eventObject) {
			const options:{} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			return this.props.eventObject.dateTime.toLocaleDateString('default', options);
		} else {
			return "";
		}
	};

	/**
	 * Returns elements for the selected event's description, if it is present.
	 *
	 * @method getDescriptionContent
	 * @return {ReactElement|string}		Elements for description
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getDescriptionContent ():ReactElement|string {
		if (this.props.eventObject && this.props.eventObject.description) {
			return (<li>
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
					<path d="M16,12a2,2,0,1,1,2-2A2,2,0,0,1,16,12Zm0-2Z" />
					<path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
					<path d="M16,24a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0v6A2,2,0,0,1,16,24Zm0-8v0Z" />
				</svg>
				<span>{this.props.eventObject.description}</span>
			</li>);
		} else {
			return "";
		}
	};

	/**
	 * Returns elements for the selected event's category, if it is present.
	 *
	 * @method getCategoryContent
	 * @return {ReactElement|string}		Elements for category
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getCategoryContent ():ReactElement|string {
		if (this.props.eventObject && this.props.eventObject.category) {
			return (<li>
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
					<path d="M26,25H6a3,3,0,0,1-3-3V20a1,1,0,0,1,1-1,3,3,0,0,0,0-6,1,1,0,0,1-1-1V10A3,3,0,0,1,6,7H26a3,3,0,0,1,3,3v2a1,1,0,0,1-1,1,3,3,0,0,0,0,6,1,1,0,0,1,1,1v2A3,3,0,0,1,26,25ZM5,20.9V22a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V20.9a5,5,0,0,1,0-9.8V10a1,1,0,0,0-1-1H6a1,1,0,0,0-1,1v1.1a5,5,0,0,1,0,9.8Z" />
				</svg>
				<span>{this.props.eventObject.category}</span>
			</li>);
		} else {
			return "";
		}
	};

	/**
	 * Returns an object of style properties for event popup.
	 *
	 * @method getContainerStyles
	 * @return {React.CSSProperties}		Object of style properties
	 * @author bivanov
	 * @date 13/06/2021
	 */
	getContainerStyles ():React.CSSProperties {
		const dotSize:number = 10;
		const bodyWidth:number = document.body.offsetWidth;
		const bodyHeight:number = document.body.offsetHeight;
		const styles:PopupContainerStyles = {};
		if (this.props.styleProperties.isVisible) {
			styles.display = "block";
		}
		
		if ((bodyHeight / 3*2) < this.props.styleProperties.y) {
			styles.bottom = (bodyHeight - this.props.styleProperties.y + dotSize) + "px";
		} else {
			styles.top = (this.props.styleProperties.y + dotSize) + "px";
		}
		if ((bodyWidth / 2) < this.props.styleProperties.x) {
			styles.right = (bodyWidth - this.props.styleProperties.x + dotSize) + "px";
		} else {
			styles.left = (this.props.styleProperties.x + dotSize) + "px";
		}
		return styles;
	};

	/**
	 * Entrypoint and main render function of the component.
	 *
	 * @method render
	 * @returns {ReactElement}	Component body
	 * @author bivanov
	 * @date 13/06/2021
	 */
	render ():ReactElement|string {
		if (this.props.eventObject) {
			return (
				<div className="eventPopup" style={this.getContainerStyles()}>
					<div className="headerDiv" style={{backgroundColor: this.props.eventObject.color || "var(--green-event-color)"}}>
						<span className="closePopup" onClick={() => { Emitter.emit('hide_event_popup', null); }}>&#10006;</span>
						<span>{this.props.eventObject.name}</span>
					</div>
					<ul className="contentUl"  style={{fill: this.props.eventObject.color || "var(--green-event-color)"}}>
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
						{this.getDescriptionContent()}
						{this.getCategoryContent()}
					</ul>
				</div>
			);
		} else {
			return "";
		}
	};
};

export default EventPopup;