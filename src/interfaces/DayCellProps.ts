import EventDotProps from "./EventDotProps"

export default interface DayCellProps {
    dayNumber: number;
	isFromCurrentMonth: boolean;
	isCurrentDay: boolean;
	events: EventDotProps[];
};