// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
interface Props{
    images:Array<string>
}


const Slider =  ({images}:Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
          slidesPerView={1}
      autoplay
      loop
      rewind
   parallax
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      style={{height: "100%"}}
      >
          
          {
              images.map((image) => (
                  <SwiperSlide><img src={image} alt="" /></SwiperSlide>
                  
              ))
          }
  
    </Swiper>
  );
};


export default Slider