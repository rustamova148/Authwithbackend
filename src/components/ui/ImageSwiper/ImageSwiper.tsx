import type { ImageSwiperProps } from "../../../types/propsTypes";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ImageSwiper = ({ images }: ImageSwiperProps) => {
  return (
    <SwiperReact
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div style={{ height: "550px" }}>
            <img src={src} width={450} height={550} alt={`slide-${index}`} />
          </div>
        </SwiperSlide>
      ))}
    </SwiperReact>
  );
};

export default ImageSwiper;
