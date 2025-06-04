import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  onClose: () => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  date, 
  onDateChange, 
  onClose 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateInRange = (checkDate: Date) => {
    if (!date.from || !date.to) return false;
    return checkDate >= date.from && checkDate <= date.to;
  };

  const isDateSelected = (checkDate: Date) => {
    if (!date.from && !date.to) return false;
    return (
      (date.from && checkDate.toDateString() === date.from.toDateString()) ||
      (date.to && checkDate.toDateString() === date.to.toDateString())
    );
  };

  const handleDateClick = (clickedDate: Date) => {
    if (selectingStart || !date.from) {
      onDateChange({ from: clickedDate, to: undefined });
      setSelectingStart(false);
    } else {
      if (clickedDate < date.from) {
        onDateChange({ from: clickedDate, to: date.from });
      } else {
        onDateChange({ from: date.from, to: clickedDate });
      }
      setSelectingStart(true);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const resetDates = () => {
    onDateChange({ from: undefined, to: undefined });
    setSelectingStart(true);
  };

  const applyDates = () => {
    if (date.from && date.to) {
      onClose();
    }
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-80">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-10" />;
          }

          const isSelected = isDateSelected(day);
          const isInRange = isDateInRange(day);
          const isToday = day.toDateString() === today.toDateString();
          const isPast = day < today;

          return (
            <button
              key={day.toDateString()}
              onClick={() => !isPast && handleDateClick(day)}
              disabled={isPast}
              className={`
                h-10 w-10 text-sm font-medium rounded-full transition-all duration-200
                ${isPast 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer'
                }
                ${isSelected 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : ''
                }
                ${isInRange && !isSelected 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : ''
                }
                ${isToday && !isSelected 
                  ? 'ring-2 ring-emerald-200 text-emerald-600' 
                  : ''
                }
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={resetDates}
          className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Reset
        </button>
        <button
          onClick={applyDates}
          disabled={!date.from || !date.to}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;