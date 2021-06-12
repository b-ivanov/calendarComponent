import EventDotProps from "./interfaces/EventDotProps";

const now:Date = new Date(); // using a global variable to have examples for the current month
const year:number = now.getFullYear();
const month:number = now.getMonth();

export const data:EventDotProps[] = [{
	id: "evt_1", 									//REQUIRED, custom ID to easily find an event
	dateTime: new Date(year, month, 1), 			//REQUIRED, date and time of the event in a Date object
	name: "My event on the 1st day of the month!", 	//REQUIRED, name of the event
	type: 0, 										//REQUIRED, type of the event (0 - single / 1 - recurring)
	color: "#800080", 								//OPTIONAL, add a custom color
	description: "Trying out stuff.", 				//OPTIONAL, add mode details for the event
	category: "Personal events" 								//OPTIONAL, add a category for easier filtering
}, {
	id: "evt_2",
	dateTime: new Date(year, month, 28),
	name: "Another event in the end of the month.",
	type: 0
}, {
	id: "evt_3",
	dateTime: new Date(year, month, 15),
	name: "My event on the 15th day of the month.",
	type: 0
}, {
	id: "evt_4",
	dateTime: new Date(year, month, 22),
	name: ["First of three events on 22", month, year].join("/"),
	type: 0,
	color: "#b02942",
	description: "Trying out stuff.",
	category: "Personal events"
}, {
	id: "evt_5",
	dateTime: new Date(year, month, 22),
	name: ["Second of three events on 22", month, year].join("/"),
	type: 0,
	color: "#5cb058",
	description: "Trying out stuff.",
	category: "Personal events"
}, {
	id: "evt_6",
	dateTime: new Date(year, month, 22),
	name: ["Third of three events on 22", month, year].join("/"),
	type: 0,
	color: "#d35c27",
	description: "Trying out stuff.",
	category: "Personal events"
}, {
	id: "evt_7",
	dateTime: new Date(year, month, 12),
	name: "And one last example to show that events don't need to be sorted",
	type: 0,
	color: "#d35c27",
	description: "Trying out stuff.",
	category: "Personal events"
}];