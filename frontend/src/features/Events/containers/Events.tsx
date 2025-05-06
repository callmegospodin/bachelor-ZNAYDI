import { useState, useMemo, FC } from "react";
import { motion } from "framer-motion";
import { eventCategories, events, EventType } from "../constants/constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";

export const Events: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<keyof EventType>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 12;

  const filteredEvents = useMemo(() => {
    let data = events;

    if (selectedCategory) {
      data = data.filter((event) => event.category_id === selectedCategory);
    }

    if (search) {
      const lower = search.toLowerCase();
      data = data.filter(
        (event) =>
          event.name.toLowerCase().includes(lower) ||
          event.description.toLowerCase().includes(lower) ||
          event.content.toLowerCase().includes(lower) ||
          event.city.toLowerCase().includes(lower) ||
          event.address.toLowerCase().includes(lower)
      );
    }

    data = data.filter(
      (event) => event.price >= priceRange[0] && event.price <= priceRange[1]
    );

    if (sortField) {
      data = [...data].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    return data;
  }, [search, sortField, sortOrder, selectedCategory, priceRange]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEvents.slice(start, start + pageSize);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / pageSize);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="px-6 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Сторінка івентів</h1>
          <p className="text-gray-600 mt-1 max-w-xl">
            Тут ви можете переглядати доступні події, фільтрувати їх за
            категоріями, ціною, та сортувати за рейтингом, датою або назвою.
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition"
          onClick={() => navigate("/create-events")}
        >
          Створити івент
        </button>
      </div>
      <div className="flex flex-col md:flex-row p-6 gap-8 min-h-screen">
        <div className="w-full md:w-1/4 space-y-8 bg-white p-4 rounded-xl shadow-md">
          <div>
            <input
              type="text"
              placeholder="Пошук івенту..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Сортувати</h3>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as keyof EventType)}
              className="w-full p-3 border rounded-lg shadow-sm"
            >
              <option value="name">Назва</option>
              <option value="price">Ціна</option>
              <option value="rating">Рейтинг</option>
              <option value="date_time">Дата</option>
            </select>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="w-full mt-3 p-3 rounded-lg bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition"
            >
              {sortOrder === "asc" ? "За зростанням" : "За спаданням"}
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Фільтр по ціні</h3>
            <Slider
              range
              min={0}
              max={5000}
              step={50}
              defaultValue={[0, 5000]}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              trackStyle={[{ backgroundColor: "#2B2EFF" }]}
              handleStyle={[
                { backgroundColor: "#2B2EFF", borderColor: "#8385F9" },
                { backgroundColor: "#2B2EFF", borderColor: "#8385F9" },
              ]}
            />
            <div className="flex justify-between text-sm mt-2 text-gray-600">
              <span>₴{priceRange[0]}</span>
              <span>₴{priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Категорії</h3>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition ${
                    selectedCategory === null ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Всі категорії
                </button>
              </li>
              {eventCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition hover:bg-blue-100 ${
                      selectedCategory === cat.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.03] transition-transform"
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <img
                  src={event.photo_url}
                  alt={event.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2 text-gray-800 truncate">
                    {event.name}
                  </h4>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Рейтинг: {event.rating}</span>
                    <span>₴{event.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  currentPage === idx + 1
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
