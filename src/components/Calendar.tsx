import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useMemo } from 'react';
import { format, startOfMonth, getDay, getDaysInMonth, addDays } from 'date-fns';

const mockStreakDates: Date[] = [
  new Date(2025, 3, 1),
  new Date(2025, 3, 2),
  new Date(2025, 3, 3),
  new Date(2025, 3, 6),
  new Date(2025, 3, 9),
  new Date(2025, 3, 10),
  new Date(2025, 3, 13)
];

// Define the props for the component
interface CalendarStreakWidgetProps {
  streakDates?: Date[];
  className?: string;
}

type CalendarGridDay = {
  key: string;
  dateObject: Date | null;
  dayOfMonth: number | null;
  isStreakDay: boolean;
};

const daysOfWeekHeaders = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'];

const CalendarStreakWidget: React.FC<CalendarStreakWidgetProps> = ({
  streakDates,
  className = ''
}) => {
  const effectiveStreakDates =
    streakDates && streakDates.length > 0 ? streakDates : mockStreakDates;

  const calendarGridDays = useMemo((): CalendarGridDay[] => {
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const totalDaysInMonth = getDaysInMonth(today);
    const startDayOfWeekIndex = getDay(firstDayOfMonth);
    const leadingBlankCount = startDayOfWeekIndex === 0 ? 6 : startDayOfWeekIndex - 1;

    const streakDaySet = new Set<string>();
    effectiveStreakDates.forEach((date) => {
      // Use effectiveStreakDates here
      try {
        streakDaySet.add(format(date, 'yyyy-MM-dd'));
      } catch (e) {
        console.error('Error formatting streak date:', date, e);
      }
    });

    const gridDays: CalendarGridDay[] = [];

    // Add blank cells
    for (let i = 0; i < leadingBlankCount; i++) {
      gridDays.push({
        key: `blank-${i}`,
        dateObject: null,
        dayOfMonth: null,
        isStreakDay: false
      });
    }

    // Add actual day cells
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const dateObject = addDays(firstDayOfMonth, i - 1);
      const formattedDateStr = format(dateObject, 'yyyy-MM-dd');
      const isStreak = streakDaySet.has(formattedDateStr); // Check against the correct set

      gridDays.push({
        key: `day-${i}`,
        dateObject: dateObject,
        dayOfMonth: i,
        isStreakDay: isStreak
      });
    }

    return gridDays;
  }, [effectiveStreakDates]);

  return (
    <div className={`h-fit rounded-lg w-full bg-primary-hover text-text ${className}`}>
      <h2 className="font-medium text-lg border-b border-accessible-green p-2 rounded-t-lg">
        Streak Calendar
      </h2>
      <div className="px-4 py-2 grid grid-cols-7 gap-3">
        {/* Day Headers */}
        {daysOfWeekHeaders.map((day) => (
          <div
            key={day}
            className="flex justify-center items-center h-6 w-6 text-text text-sm font-thin">
            {day}
          </div>
        ))}

        {/* Calendar Day Cells */}
        {calendarGridDays.map((dayInfo) => (
          <div
            key={dayInfo.key}
            className={`flex justify-center items-center h-6 w-6 rounded-lg text-text
                       ${!dayInfo.dateObject ? 'invisible' : 'bg-card-content'} `}>
            {dayInfo.dateObject && dayInfo.isStreakDay ? (
              <CheckCircleIcon className="h-6 w-6 text-accessible-green" />
            ) : (
              dayInfo.dayOfMonth && <span className="text-sm">{dayInfo.dayOfMonth}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarStreakWidget;
