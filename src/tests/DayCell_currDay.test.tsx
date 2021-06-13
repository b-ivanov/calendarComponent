import { render, screen } from '@testing-library/react';
import DayCell from '../components/DayCell';
import DayCellProps from '../interfaces/DayCellProps';

const dayObject:DayCellProps = {
  dayNumber: 12,
  isFromCurrentMonth: true,
  isCurrentDay: true
};

render(<DayCell dayNumber={dayObject.dayNumber} isFromCurrentMonth={dayObject.isFromCurrentMonth} isCurrentDay={dayObject.isCurrentDay} events={dayObject.events} />);
const dayCell:Element|null = screen.getByText(dayObject.dayNumber).parentElement;

test('renders day cell', () => {
  expect(dayCell).toBeInTheDocument();
});

test('to have day cell class', () => {
  expect(dayCell).toHaveClass("dayCell");
});

test('to have current month class', () => {
  expect(dayCell).toHaveClass("currentDay");
});