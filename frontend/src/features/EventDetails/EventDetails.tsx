import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { events } from "../Events/constants/constants";
import { GoogleMap, Marker, StreetViewPanorama } from "@react-google-maps/api";

export const EventDetails: FC = () => {
  const lat = 50.4501;
  const lng = 30.5234;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (event?.chatId) {
      fetch(`/api/messages?chat_id=${event.chatId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) =>
          console.error("Помилка завантаження повідомлень:", err)
        );
    }
  }, [event?.chatId]);

  useEffect(() => {
    if (!event) navigate("/");
  }, [event, navigate]);

  if (!event) return null;

  const handleChange = (
    field: keyof typeof editedEvent,
    value: string | number
  ) => {
    setEditedEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("🔄 Дані для збереження:", editedEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("🗑️ Видалити подію з ID:", event.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId: event.chatId,
      ownerId: "user-id-placeholder", // замініть на реального користувача
      text: newMessage,
    };

    try {
      // const response = await fetch("/api/messages", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(messageData),
      // });

      // if (response.ok) {
      //const savedMessage = await response.json();
      setMessages((prev) => [...prev, messageData]); //savedMessage
      setNewMessage("");
      // } else {
      //   console.error("Помилка надсилання повідомлення");
      // }
    } catch (err) {
      console.error("Помилка:", err);
    }
  };

  return (
    <motion.div
      className="p-8 flex flex-col gap-8 min-h-screen bg-gradient-to-b from-orange-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 w-fit bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90 text-white rounded-xl shadow-md transition"
        >
          ← Назад
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            {isEditing ? "Скасувати" : "Редагувати"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Видалити
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <motion.img
          src={editedEvent.photo_url}
          alt={editedEvent.name}
          className="w-full h-[450px] object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="p-8 md:p-10 flex flex-col gap-6">
          {isEditing ? (
            <input
              type="text"
              value={editedEvent.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="text-4xl font-bold text-gray-800 border-b p-2"
            />
          ) : (
            <h1 className="text-4xl font-bold text-gray-800">{event.name}</h1>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div
              onClick={() => navigate(`/profile/123`)}
              className="relative w-30 h-30 rounded-full overflow-hidden cursor-pointer group"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Organizer avatar"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-125"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">
                  Переглянути профіль
                </span>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                Організатор:
              </p>
              <p className="text-gray-700">
                Імʼя: <span className="font-medium">Олег</span>
              </p>
              <p className="text-gray-700">
                Прізвище: <span className="font-medium">Шевченко</span>
              </p>
              <p className="text-gray-700">
                Email: <span className="font-medium">oleg@example.com</span>
              </p>
              <p className="text-gray-700">
                Телефон: <span className="font-medium">+380961234567</span>
              </p>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedEvent.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="text-lg text-gray-600 leading-relaxed border p-2 rounded-md"
            />
          ) : (
            <p className="text-2xl text-gray-600 leading-relaxed">
              {event.description}
            </p>
          )}

          <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
            {isEditing ? (
              <textarea
                value={editedEvent.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            ) : (
              <p className="text-gray-700">{event.content}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Місто:</span>{" "}
                {isEditing ? (
                  <input
                    value={editedEvent.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border-b ml-2"
                  />
                ) : (
                  event.city
                )}
              </p>
              <p>
                <span className="font-semibold">Адреса:</span>{" "}
                {isEditing ? (
                  <input
                    value={editedEvent.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="border-b ml-2"
                  />
                ) : (
                  event.address
                )}
              </p>
              <p>
                <span className="font-semibold">Дата та час:</span>{" "}
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={new Date(editedEvent.date_time)
                      .toISOString()
                      .slice(0, 16)}
                    onChange={(e) => handleChange("date_time", e.target.value)}
                    className="border-b ml-2"
                  />
                ) : (
                  new Date(event.date_time).toLocaleString()
                )}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Ціна:</span>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={editedEvent.price}
                    onChange={(e) => handleChange("price", +e.target.value)}
                    className="border-b ml-2 w-24"
                  />
                ) : (
                  `₴${event.price}`
                )}
              </p>
              <p>
                <span className="font-semibold">Кількість учасників:</span>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={editedEvent.participants}
                    onChange={(e) =>
                      handleChange("participants", +e.target.value)
                    }
                    className="border-b ml-2 w-24"
                  />
                ) : (
                  event.participants
                )}
              </p>
              <p>
                <span className="font-semibold">Рейтинг:</span> ⭐{" "}
                {event.rating} / 5
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Зберегти зміни
            </button>
          )}

          <div className="w-full h-[400px] mt-8 rounded-xl overflow-hidden border-2 border-orange-300 shadow-lg">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat, lng }}
              zoom={14}
            >
              <Marker position={{ lat, lng }} />
              <StreetViewPanorama
                options={{
                  position: { lat, lng },
                  visible: true,
                }}
              />
            </GoogleMap>
          </div>
        </div>
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            💬 Коментарі
          </h2>

          <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 rounded-md bg-gray-100 shadow-sm"
              >
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">👤 Користувач:</span>{" "}
                  {msg.owner_id}
                </p>
                <p className="text-gray-800 mt-1">{msg.text}</p>
                <p className="text-xs text-gray-400 text-right">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ваш коментар..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Надіслати
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
