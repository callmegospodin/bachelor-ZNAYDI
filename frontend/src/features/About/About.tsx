import { motion } from "framer-motion";
import { FC } from "react";

const socialMocks = [
  {
    platform: "EventifyHub",
    img: "https://images.unsplash.com/photo-1632009613808-70a20dacccb6?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Наша присутність у спільноті організаторів подій — натхнення для тисяч користувачів щодня.",
  },
  {
    platform: "Znaidy_community",
    img: "https://plus.unsplash.com/premium_photo-1661389625547-e4977d5727a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Ділимося моментами, знайомимо нових друзів і створюємо магію зустрічей офлайн та онлайн.",
  },
  {
    platform: "Find.Events.Today",
    img: "https://marketer.ua/wp-content/uploads/2023/12/Event-marketing.jpg",
    description:
      "Щоденні добірки найцікавіших подій у твоєму місті — просто у стрічці.",
  },
];

export const About: FC = () => {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-purple-100 min-h-screen pt-28 px-6 md:px-16 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-800 mb-12"
      >
        Znaidy — платформа для нових подій, людей та історій
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center text-gray-700 text-lg mb-16"
      >
        Ми створили Znaidy, щоб допомогти людям відкривати світ навколо:
        знаходити нові події, знайомитися з натхненними організаторами та бути
        частиною чогось більшого. Тут починаються знайомства, з’являються ідеї
        та народжуються ініціативи.
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {socialMocks.map((mock, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={mock.img}
              alt={mock.platform}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                @{mock.platform}
              </h3>
              <p className="text-gray-600 text-sm">{mock.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Наше бачення
        </h2>
        <p className="text-gray-700 text-center">
          Ми віримо, що кожна людина може створити івент, який змінює світ
          навколо. І не має значення, чи це майстер-клас для друзів, камерний
          концерт або конференція на 500 людей — головне, щоб це було з душею.
          <br />
          Znaidy — це місце, де події набувають значення, а спільноти
          народжуються з ідей.
        </p>
      </motion.div>
    </div>
  );
};
