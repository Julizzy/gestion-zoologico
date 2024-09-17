// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Lista de imágenes con descripciones
const images = [
  { src: "/images/tigre.jpg", description: "Este es un tigre, fuerte y majestuoso." },
  { src: "/images/panda.jpg", description: "Este es un panda, conocido por su naturaleza tranquila." },
  { src: "/images/lobo.jpg", description: "Este es un lobo, símbolo de trabajo en equipo." },
  { src: "/images/snake.jpg", description: "Esta es una serpiente, ágil y rápida." },
  { src: "/images/leon.jpg", description: "Este es un león, el rey de la selva." },
  { src: "/images/pantera.jpg", description: "Esta es una pantera, sigilosa y poderosa." },
];

export default function CarouselWithImages() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative group w-64 h-64"> {/* Tamaño fijo para cada slide */}
            <img
              src={image.src}
              alt={`Animal ${index + 1}`}
              className="w-full h-full object-cover rounded"  // Ajuste de imagen con proporciones
            />
            {/* Hover card */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg p-4 text-center">{image.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
