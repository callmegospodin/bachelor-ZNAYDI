import { FC, useEffect, useRef, useState } from "react";

import {
  FaChartLine,
  FaComments,
  FaStar,
  FaCalendarPlus,
} from "react-icons/fa";
import { getInfoFromLocalStorage } from "../../../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  const guestName = getInfoFromLocalStorage("guest") || "";

  const didRun = useRef(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (!didRun.current) {
      toast.success(`Вітаємо ${guestName} на нашому сайті`);
      AOS.init({ duration: 500 });
      didRun.current = true;
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/homebackground.jpg";
    img.onload = () => setBgLoaded(true);
  }, []);

  if (!bgLoaded) {
    return <div className="min-h-screen bg-black" />; // або лоадер/шимер
  }

  return (
    <div
      className="relative flex justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/homebackground.jpg')`,
      }}
    >
      <div className="bg-blue-50 bg-opacity-90 w-4/5 p-8 rounded-lg shadow-2xl my-10">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={2000}
          className="rounded-lg overflow-hidden mb-12"
        >
          {[
            "/carousel1.jpg",
            "/carousel2.jpg",
            "/carousel3.jpg",
            "/carousel4.jpg",
            "/carousel5.jpg",
          ].map((src, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center max-h-[500px] overflow-hidden"
            >
              <img
                src={src}
                alt={`Event ${idx + 1}`}
                className="object-cover w-full max-h-[500px]"
                loading="eager"
              />
            </div>
          ))}
        </Carousel>

        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Знайди свій Івент
          </h2>
          <p className="text-gray-600 mb-6">
            Переглянь події, що вже створені іншими користувачами та приєднуйся!
          </p>
          <Link
            to="/events"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition"
          >
            Переглянути івенти
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section
            image="/section.jpg"
            title="Організуй власний івент"
            description="Створюй події для різних інтересів: фестивалі, лекції, майстер-класи та інше."
            aos="fade-right"
          />

          <Section
            image="/section1.jpg"
            title="Спілкуйся з учасниками"
            description="Обговорюй ідеї, ділись враженнями та організовуй зустрічі прямо в нашій платформі."
            aos="fade-left"
          />

          <Section
            image="/section2.jpg"
            title="Знаходь однодумців"
            description="Долучайся до спільнот за інтересами: подорожі, творчість, стартапи тощо."
            aos="fade-right"
          />

          <Section
            image="/section3.jpg"
            title="Доєднуйся до подій"
            description="Не обов'язково організовувати самому — приєднуйся до івентів, що тобі до душі."
            aos="fade-left"
          />

          <Section
            image="/section4.jpg"
            title="Отримуй натхнення"
            description="Відвідуй воркшопи, тренінги, творчі вечори та дізнавайся нове!"
            aos="fade-up"
          />

          <Section
            image="/section5.jpg"
            title="Створюй спільноти"
            description="Формуй свою групу людей за інтересами та розвивайтеся разом."
            aos="fade-up"
          />
        </div>

        <div className="mt-16">
          <h2
            className="text-3xl font-bold text-center text-gray-800 mb-10"
            data-aos="fade-up"
          >
            Можливості для організаторів
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaCalendarPlus size={40} className="text-blue-500 mb-4" />}
              title="Легке створення івентів"
              description="Створюй заходи за кілька хвилин з детальним налаштуванням формату, локації та учасників."
            />
            <FeatureCard
              icon={<FaComments size={40} className="text-pink-500 mb-4" />}
              title="Чати та обговорення"
              description="Спілкуйся з учасниками через чати, плануй активності та дізнавайся думки одразу."
            />
            <FeatureCard
              icon={<FaChartLine size={40} className="text-green-500 mb-4" />}
              title="Аналітика івентів"
              description="Слідкуй за реєстраціями, відвідуваністю та залученістю учасників через детальні графіки."
            />
            <FeatureCard
              icon={<FaStar size={40} className="text-yellow-500 mb-4" />}
              title="Рейтинги та відгуки"
              description="Отримуй оцінки та відгуки на свої заходи для покращення майбутніх івентів."
            />
          </div>
        </div>
        <div className="mt-20" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Проведені івенти та відгуки
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Ми вже організували десятки заходів. Ось деякі з них, які
            запам'ятались найбільше нашим учасникам.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                title: "Весняний Фестиваль Вуличної Їжі",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfDmNm9MgUSbkExfxGymtOidP2NAeIGdnfA&s",
                review:
                  "Неймовірна атмосфера, смачна їжа та крута музика! Чекаємо наступного року!",
                author: "Ірина, Київ",
              },
              {
                title: "Осінній Хакатон Стартапів",
                image:
                  "https://lh5.googleusercontent.com/proxy/ZfK_0iKjMvLIRfJi2u4CKWHT2B0kO80QwXTAXyAJKr8xkF1gJlZKQl7mol2dvXuMBxX9c1m2Ky1KeP99jNE9Ht4Mt_5H5NhcAcg_QKcYSqURCBY",
                review:
                  "Класна організація! Знайшов партнерів для свого стартапу, дякую платформі!",
                author: "Олексій, Львів",
              },
              {
                title: "Літній Літературний Пікнік",
                image:
                  "https://zakarpattya.net.ua/postimages/pub/2017/07/3-98.jpg",
                review:
                  "Затишна атмосфера серед природи, вірші та живі виступи – магія!",
                author: "Марія, Одеса",
              },
            ].map(({ title, image, review, author }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-48 w-full object-cover rounded-t-2xl"
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 italic mb-4 leading-relaxed">
                    “{review}”
                  </p>
                  <p className="text-sm text-gray-500 text-right">— {author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section: FC<{
  image: string;
  title: string;
  description: string;
  aos: string;
}> = ({ image, title, description, aos }) => (
  <div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
    data-aos={aos}
  >
    <img
      src={image}
      alt={title}
      className="h-40 w-full object-cover rounded-md mb-4"
    />
    <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureCard: FC<{
  icon: JSX.Element;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow shadow-lg"
    data-aos="zoom-in"
  >
    {icon}
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
