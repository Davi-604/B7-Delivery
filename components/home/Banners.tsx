import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const Banners = () => {
    return (
        <div className="">
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <div className="mt-[-27px] mr-[-20px]">
                        <img className="w-full h-full object-c" src="/temp/banner1.png" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src="/temp/banner2.jpg" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
