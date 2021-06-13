import { render, screen } from '@testing-library/react';
import DayHeaders from '../components/DayHeaders';

test('renders today button', () => {
  render(<DayHeaders />);
  const dayNames:string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let index:string = "";
  for (index in dayNames) {
    expect(screen.getByText(dayNames[index])).toBeInTheDocument();
  }
});