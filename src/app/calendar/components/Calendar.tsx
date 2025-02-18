"use client"

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Mock events for demonstration
  const events = {
    5: "Team Meeting",
    12: "Project Deadline",
    15: "Birthday Party",
    25: "Doctor's Appointment"
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-20"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

      const hasEvent = events[day as keyof typeof events];

      days.push(
        <div 
          key={day}
          className={`h-20 border-2 border-[var(--c64-brown)] p-2 relative
                     ${isToday ? 'bg-[var(--c64-brown)] text-[var(--c64-light)]' : 'bg-[var(--c64-light)]'}
                     ${hasEvent ? 'cursor-pointer' : ''}`}
        >
          <span className="font-bold">{day}</span>
          {hasEvent && (
            <div className="mt-1 text-xs p-1 bg-[var(--c64-tan)] text-[var(--c64-dark)] rounded">
              {events[day as keyof typeof events]}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="h-[calc(100vh-3rem)]">
      <h1 className="text-2xl font-bold mb-4">RetroCalendar</h1>
      <div className="retro-panel">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="retro-button">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="retro-button">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className="h-10 flex items-center justify-center font-bold bg-[var(--c64-brown)] text-[var(--c64-light)]"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
} 