import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  getInfoFromLocalStorage,
  setInfoToLocalStorage,
} from "../../helpers/localstorage.helper";

export const Favorites: FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(getInfoFromLocalStorage("favorites") || "[]");
    setFavorites(stored);
    console.log(stored);
  }, []);

  const toggleFavorite = (eventId: string) => {
    const updated = favorites.filter((event) => event.id !== eventId);
    setFavorites(updated);
    setInfoToLocalStorage("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <h1 className="text-2xl font-semibold">Улюблені події відсутні</h1>
        <p className="mt-2">Спробуйте додати щось із головної сторінки 🧡</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Улюблені івенти</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/event/${event.id}`)}
          >
            {event?.photoUrl && (
              <img
                src={event.photoUrl}
                alt={event.name}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h4 className="text-lg font-bold mb-2 text-gray-800 truncate">
                {event.name}
              </h4>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Рейтинг: {event.rating}</span>
                <span>Ціна: ₴{event.price}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Прибрати з улюблених"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="red"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
