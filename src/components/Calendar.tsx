import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type CalendarDay = {
  date: number;
  isCompleted: boolean;
};

const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'];

function generateMonthDays(): CalendarDay[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Dummy completed streaks for demonstration
  const completedDays = [1, 2, 3, 6, 9, 10, 11, 14, 20];

  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: i + 1,
    isCompleted: completedDays.includes(i + 1)
  }));
}

const CalendarStreakWidget = () => {
  const [monthDays] = useState(generateMonthDays());

  return (
    <div className="h-fit rounded-lg w-full bg-primary-hover text-text">
      <h2 className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg">
        Streak Calendar
      </h2>
      <div className="px-4 py-2 grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div className="flex justify-center items-center h-6 w-6 text-text text-sm font-thin">
            {day}
          </div>
        ))}
        {monthDays.map((day) => (
          <div
            key={day.date}
            className="flex justify-center items-center h-6 w-6 rounded-lg bg-card-content text-text">
            {day.isCompleted ? (
              <CheckCircleIcon className="h-6 w-6 text-accessible-green" />
            ) : (
              <span className="text-sm">{day.date}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarStreakWidget;
