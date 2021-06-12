import EventDotProps from "./EventDotProps";
export default interface EventPopupProps {
    styleProperties: {
        isVisible: boolean,
        x: number,
        y: number
    };
    eventObject: EventDotProps|null;
};