import { render, screen } from '@testing-library/react';
import EventDot from '../components/EventDot';
import EventDotProps from '../interfaces/EventDotProps';

const now:Date = new Date();
const evt:EventDotProps = {
  id: "test_event",
  dateTime: now,
  name: "Name of the test event",
  type: 0,
  color: "#123456",
  description: "Descrition of the test event",
  category: "Random"
};

render(<EventDot id={evt.id} dateTime={evt.dateTime} name={evt.name} type={evt.type} color={evt.color} description={evt.description} category={evt.category} key={evt.id}/>);
const eventDot:Element = screen.getByText("•");

test('renders event dot', () => {
  expect(eventDot).toBeInTheDocument();
});

test('event dot has correct id', () => {
  expect(eventDot).toHaveAttribute("id", evt.id);
});

test('event dot has correct title', () => {
  expect(eventDot).toHaveAttribute("title", evt.name);
});

test('event dot has correct color', () => {
  expect(eventDot).toHaveStyle({"color": evt.color});
});

test('event dot has correct class', () => {
  expect(eventDot).toHaveClass("eventDot");
});