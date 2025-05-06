import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { eventCategories } from "../Events/constants/constants";

type EventFormInputs = {
  name: string;
  description?: string;
  content?: string;
  price?: number;
  dateTime?: string;
  type?: string;
  city?: string;
  address?: string;
  participants?: number;
  rating?: number;
  photo_url?: string;
  categoryId: string;
};

export const CreateEvents: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormInputs>();

  const onSubmit: SubmitHandler<EventFormInputs> = (data) => {
    console.log("Submitted Data:", data);
    // API call here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-50 to-white pt-10 pb-10"
    >
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Створити новий івент
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Назва *
              </label>
              <input
                {...register("name", { required: "Назва обов'язкова" })}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
                placeholder="Введіть назву івенту"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ціна
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
                placeholder="₴"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Місто
              </label>
              <input
                {...register("city")}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
                placeholder="Київ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата та час
              </label>
              <input
                type="datetime-local"
                {...register("dateTime")}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опис
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-3 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
                rows={4}
                placeholder="Короткий опис івенту"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Контент
              </label>
              <textarea
                {...register("content")}
                className="w-full px-4 py-3 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
                rows={4}
                placeholder="Деталі або програма івенту"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Адреса
              </label>
              <input
                {...register("address")}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Кількість учасників
              </label>
              <input
                type="number"
                {...register("participants")}
                className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категорія *
              </label>
              <select
                {...register("categoryId", { required: "Оберіть категорію" })}
                className="w-full px-4 py-2 border border-blue-400 bg-white rounded-xl text-sm shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Оберіть категорію</option>
                {eventCategories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-sm py-1">
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип події
              </label>
              <motion.select
                {...register("type", { required: "Виберіть тип події" })}
                className="w-full px-4 py-2 border border-blue-400 bg-white rounded-xl text-sm shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <option value="" disabled hidden>
                  Оберіть тип
                </option>
                <option value="online">Онлайн</option>
                <option value="offline">Офлайн</option>
              </motion.select>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Посилання на фото
            </label>
            <input
              {...register("photo_url")}
              className="w-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-xl shadow-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition"
          >
            Створити івент
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
