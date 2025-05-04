import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  age?: number;
  photo_url?: string;
  about?: string;
  city?: string;
  role_id: string;
  followers_list_id: string;
  created_at: string;
  updated_at: string;
};

const mockUser: User = {
  id: "uuid-123",
  email: "test@example.com",
  password: "********",
  first_name: "Іван",
  last_name: "Петренко",
  phone: "+380991234567",
  age: 28,
  photo_url: "https://randomuser.me/api/portraits/men/75.jpg",
  about: "Привіт! Я розробник з Києва.",
  city: "Київ",
  role_id: "role-uuid",
  followers_list_id: "followers-uuid",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const Profile: FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [editing, setEditing] = useState(false);
  const [following, setFollowing] = useState(false);
  const followerCount = 248; // Демонстраційна кількість підписників

  const handleChange = (field: keyof User, value: string | number) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pt-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/80 max-w-4xl mx-auto mt-0 p-10 rounded-3xl shadow-2xl"
      >
        <motion.div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            🎉 Профіль організатора
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setFollowing((prev) => !prev)}
              className={`px-4 py-2 font-semibold rounded-xl shadow transition ${
                following
                  ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {following ? "Відписатися" : "Стежити"}
            </button>
            <button
              onClick={() => setEditing((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
            >
              {editing ? "Скасувати" : "Редагувати"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-8 items-start flex-wrap"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-40 h-40 rounded-full overflow-hidden shadow-lg group relative cursor-pointer"
          >
            <img
              src={user.photo_url}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              Переглянути фото
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-2 gap-6">
            <ProfileField
              label="Ім'я"
              value={user.first_name}
              editable={editing}
              onChange={(val) => handleChange("first_name", val)}
            />
            <ProfileField
              label="Прізвище"
              value={user.last_name}
              editable={editing}
              onChange={(val) => handleChange("last_name", val)}
            />
            <ProfileField
              label="Email"
              value={user.email}
              editable={editing}
              onChange={(val) => handleChange("email", val)}
            />
            <ProfileField
              label="Телефон"
              value={user.phone || ""}
              editable={editing}
              onChange={(val) => handleChange("phone", val)}
            />
            <ProfileField
              label="Місто"
              value={user.city || ""}
              editable={editing}
              onChange={(val) => handleChange("city", val)}
            />
            <ProfileField
              label="Вік"
              value={user.age?.toString() || ""}
              editable={editing}
              onChange={(val) => handleChange("age", +val)}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="font-semibold block mb-2">Про себе:</label>
          {editing ? (
            <textarea
              value={user.about}
              onChange={(e) => handleChange("about", e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3"
            />
          ) : (
            <p className="text-gray-700 bg-white/50 rounded-lg p-4">
              {user.about || "—"}
            </p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-600 bg-white/60 p-4 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            🆔 <strong>ID:</strong> {user.id}
          </p>
          <p>
            🔑 <strong>Role ID:</strong> {user.role_id}
          </p>
          <Link
            to={`/followers/profile/${user.id}`}
            className="text-blue-600 hover:underline"
          >
            👥 <strong>Підписники:</strong> {followerCount}
          </Link>
          <p>
            📆 <strong>Створено:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>
          <p>
            ✏️ <strong>Оновлено:</strong>{" "}
            {new Date(user.updated_at).toLocaleString()}
          </p>
        </motion.div>

        {editing && (
          <motion.div
            className="mt-8 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => console.log("📝 Збережено:", user)}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              💾 Зберегти
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

type ProfileFieldProps = {
  label: string;
  value: string;
  editable: boolean;
  onChange: (value: string) => void;
};

const ProfileField: FC<ProfileFieldProps> = ({
  label,
  value,
  editable,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    {editable ? (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mt-1 shadow"
      />
    ) : (
      <p className="text-gray-800 mt-1">{value || "—"}</p>
    )}
  </div>
);
