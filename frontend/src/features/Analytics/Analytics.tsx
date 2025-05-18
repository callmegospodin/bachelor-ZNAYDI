import { FC, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Event {
  id: number;
  name: string;
  city: string;
  category_id: number;
  rating: number;
  participants: number;
  price: number;
}

interface Category {
  id: number;
  name: string;
}

export const Analytics: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: "Освіта" },
      { id: 2, name: "Спорт" },
      { id: 3, name: "Мистецтво" },
    ]);

    setEvents([
      {
        id: 1,
        name: "Футбол",
        city: "Київ",
        category_id: 2,
        rating: 4.5,
        participants: 30,
        price: 200,
      },
      {
        id: 2,
        name: "Лекція",
        city: "Львів",
        category_id: 1,
        rating: 3.8,
        participants: 10,
        price: 100,
      },
      {
        id: 3,
        name: "Виставка",
        city: "Одеса",
        category_id: 3,
        rating: 4.9,
        participants: 50,
        price: 300,
      },
      {
        id: 4,
        name: "Йога",
        city: "Київ",
        category_id: 2,
        rating: 4.0,
        participants: 20,
        price: 150,
      },
      {
        id: 5,
        name: "Семінар",
        city: "Львів",
        category_id: 1,
        rating: 4.2,
        participants: 15,
        price: 180,
      },
    ]);
  }, []);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const eventsByCategory = categories.map((cat) => {
    const catEvents = events.filter((e) => e.category_id === cat.id);
    return {
      name: cat.name,
      подій: catEvents.length,
      рейтинг: Number(
        (
          catEvents.reduce((acc, e) => acc + e.rating, 0) /
          (catEvents.length || 1)
        ).toFixed(2)
      ),
      ціна: Number(
        (
          catEvents.reduce((acc, e) => acc + e.price, 0) /
          (catEvents.length || 1)
        ).toFixed(2)
      ),
      учасників: catEvents.reduce((acc, e) => acc + e.participants, 0),
    };
  });

  const eventsByCity = Object.values(
    events.reduce(
      (acc, e) => {
        acc[e.city] = acc[e.city] || { name: e.city, подій: 0 };
        acc[e.city].подій += 1;
        return acc;
      },
      {} as Record<string, { name: string; подій: number }>
    )
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-10 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
        Аналітика подій
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Кількість подій по категоріях
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="подій" fill="#2B2EFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Середній рейтинг по категоріях
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventsByCategory}
                dataKey="рейтинг"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {eventsByCategory.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Кількість подій по містах
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsByCity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="подій" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Середня ціна подій по категоріях (₴)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ціна" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
