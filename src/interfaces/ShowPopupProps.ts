import EventDotProps from "./EventDotProps";

export default interface ShowPopupProps {
	dotProps: EventDotProps | null;
	coords: {
		isVisible: boolean;
		x: number;
		y: number;
	};
};