import EventDotProps from "./EventDotProps";
export default interface CalendarComponentState {
	sortedEvents: EventDotProps[][],
	year: number;
	month: number;
	day: number;
	showEventPopup: {
        isVisible: boolean,
        x: number,
        y: number
    };
	selectedEvent: EventDotProps|null;
};