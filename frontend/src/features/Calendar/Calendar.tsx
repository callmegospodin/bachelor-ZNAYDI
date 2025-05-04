import { FC, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import React from "react";

dayjs.extend(isoWeek);

interface EventType {
  id: string;
  name: string;
  date_time: string;
}

const events: EventType[] = [
  {
    id: "a1f4a5aa-1b7e-4c6f-bf91-dfa847f6e1f0",
    name: "Фестиваль вуличної їжі",
    date_time: "2025-05-10T12:00:00Z",
  },
  {
    id: "b2c5a64e-6d5c-4bb2-9c2e-2b1ab5ad3a67",
    name: "Startup Weekend",
    date_time: "2025-06-01T09:00:00Z",
  },
];

export const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("isoWeek");
  const endDate = endOfMonth.endOf("isoWeek");

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

  const calendar = useMemo(() => {
    const calendar: dayjs.Dayjs[][] = [];
    let day = startDate.clone();

    while (day.isBefore(endDate, "day") || day.isSame(endDate, "day")) {
      const week: dayjs.Dayjs[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(day.clone());
        day = day.add(1, "day");
      }
      calendar.push(week);
    }

    return calendar;
  }, [startDate.toString(), endDate.toString()]);

  return (
    <motion.div
      className="p-6 min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          Попередній Місяць
        </button>
        <h2 className="text-2xl font-bold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          Наступний Місяць
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px border-t border-l">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold py-2 border-r border-b bg-gray-100"
          >
            {day}
          </div>
        ))}

        {calendar.map((week, weekIdx) => (
          <React.Fragment key={weekIdx}>
            {week.map((day, dayIdx) => {
              const dayEvents = events.filter((event) =>
                dayjs(event.date_time).isSame(day, "day")
              );
              const isCurrentMonth = day.month() === currentMonth.month();
              const isToday = day.isSame(dayjs(), "day");

              return (
                <motion.div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`relative h-28 p-1 border-r border-b overflow-y-auto transition-all duration-200 
                    ${isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"} 
                    ${isToday ? "bg-orange-100 border-orange-300" : ""}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm font-semibold mb-1">{day.date()}</div>

                  {dayEvents.map((event) => (
                    <Link
                      to={`/event/${event.id}`}
                      key={event.id}
                      className="block text-xs bg-orange-200 text-orange-900 rounded px-1 py-0.5 mt-0.5 truncate hover:bg-orange-300"
                    >
                      {event.name}
                    </Link>
                  ))}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
