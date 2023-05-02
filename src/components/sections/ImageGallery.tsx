import {FC, useState} from "react";

import Image from "next/image"

import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Thumbs} from "swiper";

import styles from "./styles/ImagerGallery.module.css"
import {Swiper as SwiperType} from "swiper/types";


interface Props {
    imageList: string[]
}

const ImageGallery: FC<Props> = ({imageList}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
    const [defaultImageUrl, setDefaultImageUrl] = useState("");


    return (
        <section className="flex w-full md:w-1/2">
            {/*thumbs*/}
            <Swiper
                direction="vertical"
                onSwiper={setThumbsSwiper}
                spaceBetween={0}
                slidesPerView={3.5}
                freeMode={true}
                navigation={false}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs, Navigation]}
                className={styles.thumbSwiper}
            >

                {
                    imageList.map((image, index) => (
                        <SwiperSlide key={index} className={styles.thumbSwiperSlide}>

                            <Image
                                onError={() => setDefaultImageUrl("/images/products/default-product-image.png")}
                                alt="thumb image"
                                src={defaultImageUrl ? defaultImageUrl : image}
                                width={65}
                                height={65}
                                className="rounded-lg"
                            />

                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/*large image*/}
            <Swiper
                dir="rtl"
                slidesPerView={1}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[FreeMode, Thumbs]}
                className={styles.mainSwiper}
            >
                {
                    imageList.map((image, index) => (
                        <SwiperSlide key={index} className={styles.mainSwiperSlide}
                        >
                            <div className="w-full h-72 relative">
                                <Image src={defaultImageUrl ? defaultImageUrl : image} alt="item image" fill/>
                            </div>

                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </section>

    )
}

export default ImageGallery
