import { render, screen } from '@testing-library/react';
import CalendarComponent from '../components/CalendarComponent';

test('renders today button', () => {
  render(<CalendarComponent />);
  const todayElement:Element = screen.getByText(/today/i);
  expect(todayElement).toBeInTheDocument();
});

test('renders calendar header', () => {
  render(<CalendarComponent />);
  const headerElement:Element = screen.getByText(/calendar/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders month and year subheader', () => {
  render(<CalendarComponent />);
  const now:Date = new Date();
  const subHeaderElement:Element = screen.getByText(now.toLocaleString('default', { month: 'long' }) + " " + now.getFullYear());
  expect(subHeaderElement).toBeInTheDocument();
});