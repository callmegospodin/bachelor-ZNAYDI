import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { GoogleMap, Marker, StreetViewPanorama } from "@react-google-maps/api";
import { FaStar } from "react-icons/fa";
import { EventsService } from "../Events/api/event.service";
import { toast } from "react-toastify";

export const EventDetails: FC = () => {
  const lat = 50.4501;
  const lng = 30.5234;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState<number | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

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
      // chatId: event.chatId,
      ownerId: "user-id-placeholder", // замініть на реального користувача
      text: newMessage,
    };

    try {
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (err) {
      console.error("Помилка:", err);
    }
  };

  const handleGetEvent = async () => {
    try {
      const response = await EventsService.getOneById(id || "");

      if (response?.message) {
        toast.error("Виникла проблема із отримання івенту");
      }

      setEvent(response);
      setEditedEvent(response);
      setRating(response?.rating);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleGetFeedbacks = async () => {
    try {
      if (event.id) {
        const response = await EventsService.getAllFeedbacks(event.id);

        if (response?.message) {
          toast.error("Виникла проблема із отримання фідбеків");
        }

        setFeedbacks(response);

        console.log(feedbacks);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleReviewSubmit = async () => {
    await EventsService.createFeedback({
      text: reviewText,
      eventId: event.id,
    });

    //await handleGetFeedbacks();

    setIsReviewModalOpen(false);
    setReviewText("");
    setReviewRating(0);
  };

  const handleNavigateToPayment = () => {
    navigate(`/checkout/${event.id}`);
  };

  useEffect(() => {
    handleGetEvent();
  }, []);

  useEffect(() => {
    handleGetFeedbacks();
  }, [event]);

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

  return (
    <motion.div
      className="p-8 flex flex-col gap-8 min-h-screen bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 w-fit bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] hover:opacity-90 text-white rounded-xl shadow-md transition"
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
        {editedEvent?.photoUrl && (
          <motion.img
            src={editedEvent.photoUrl}
            alt={editedEvent.name}
            className="w-full h-[450px] object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "/default-event.jpg";
            }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        <div className="p-8 md:p-10 flex flex-col gap-6">
          {isEditing ? (
            <input
              type="text"
              value={editedEvent.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="text-4xl font-bold text-gray-800 border-b p-2"
            />
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-bold text-gray-800">{event.name}</h1>

              <div className="flex gap-3">
                <button
                  onClick={() => handleNavigateToPayment()}
                  className="px-4 py-2 bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Купити
                </button>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 rounded-md border border-[#8385F9] text-[#8385F9] hover:bg-[#8385F9]/10 transition"
                >
                  Залишити відгук
                </button>
              </div>
            </div>
          )}

          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-50 to-white bg-opacity-40 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Відгук про "{event.name}"
                </h2>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Ваш відгук..."
                  className="w-full h-32 p-3 border rounded-md mb-4"
                />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReviewRating(starValue)}
                        onMouseEnter={() => setReviewHover(starValue)}
                        onMouseLeave={() => setReviewHover(null)}
                      >
                        <FaStar
                          className="text-2xl"
                          color={
                            starValue <= (reviewHover ?? reviewRating)
                              ? "#FFD700"
                              : "#d1d5db"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={() => handleReviewSubmit()}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Надіслати
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div
              onClick={() => navigate(`/profile/123`)}
              className="relative w-30 h-30 rounded-full overflow-hidden cursor-pointer group"
            >
              <img
                src="/user_photo.jpg"
                alt="Organizer avatar"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium pl-5">
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
                    value={editedEvent.dateTime}
                    onChange={(e) => handleChange("dateTime", e.target.value)}
                    className="border-b ml-2"
                  />
                ) : (
                  new Date(event.dateTime).toLocaleString()
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
              <p className="flex items-center gap-2">
                <span className="font-semibold">Рейтинг:</span>
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                      type="button"
                    >
                      <FaStar
                        color={
                          starValue <= (hover ?? rating) ? "#2B2EFF" : "#d1d5db"
                        }
                        className="text-lg transition-colors"
                      />
                    </button>
                  );
                })}
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

          <div className="w-full h-[400px] mt-8 rounded-xl overflow-hidden border-2 border-blue-300 shadow-lg">
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
                  <span className="font-semibold">👤 Користувач Олег:</span>{" "}
                  {msg.owner_id}
                </p>
                <p className="text-gray-800 mt-1">{msg.text}</p>
                <p className="text-xs text-gray-400 text-right">
                  {new Date().toLocaleString()}
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
              className="bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] hover:opacity-90 text-white rounded-xl shadow-md transition px-4 py-2 rounded-lg"
            >
              Надіслати
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🌟 Відгуки користувачів
            </h2>
            <div className="space-y-4">
              {feedbacks.length === 0 ? (
                <p className="text-gray-500">Наразі відгуків немає.</p>
              ) : (
                feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 border rounded-xl bg-gray-50 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">
                        {/* {fb.user} */} UserName
                      </span>
                      <p className="text-gray-700">{fb.text}</p>
                      {/* {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-sm"
                          color={i < fb.rating ? "#FFD700" : "#d1d5db"}
                        />
                      ))} */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mt-16 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🌟 Рекомендації організаторів
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  name: "Олег",
                  surname: "Шевченко",
                  eventsCount: 12,
                  avatar: "/avatars1.jpg",
                },
                {
                  name: "Марина",
                  surname: "Ковальчук",
                  eventsCount: 9,
                  avatar: "/avatars2.jpg",
                },
                {
                  name: "Іван",
                  surname: "Гончар",
                  eventsCount: 15,
                  avatar: "/avatars3.jpg",
                },
                {
                  name: "Анна",
                  surname: "Литвин",
                  eventsCount: 8,
                  avatar: "/avatars4.jpg",
                },
                {
                  name: "Дмитро",
                  surname: "Романюк",
                  eventsCount: 10,
                  avatar: "/avatars5.jpg",
                },
              ].map((organizer, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-32 text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-blue-400">
                    <img
                      src={organizer.avatar}
                      alt={`${organizer.name} ${organizer.surname}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 font-semibold text-gray-700">
                    {organizer.name}
                  </p>
                  <p className="text-sm text-gray-500">{organizer.surname}</p>
                  <p className="text-xs text-gray-400">
                    {organizer.eventsCount} івентів
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
