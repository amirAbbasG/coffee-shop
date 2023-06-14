import {FC} from "react";

import Link from "next/link"

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import cn from "classnames";

import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Autoplay} from "swiper";

import {MenuItemCard} from "../";
import {MenuShowCase} from "@custom-types/menu";
import styles from "./styles/MenuShowCaseSection.module.css"
import useMediaBreakpoints from "@hooks/useMediaBreakpoints";

interface Props {
    menuShowCase: MenuShowCase,
    className: string
}

const MenuShowCaseSection: FC<Props> = ({menuShowCase, className}) => {
    const {title, titleColor, bgColor, items, url, isOffer} = menuShowCase

    const {isXs, isSm, isMd, isLg, isXl, isDownXs} = useMediaBreakpoints()
    let showCount = 1.5;

    switch (true) {
        case isDownXs:
            showCount = 1.5;
            break
        case isXs:
            showCount = 2
            break;
        case isSm:
            showCount = 2.5;
            break;
        case isMd:
            showCount = 3.2;
            break
        case isLg:
            showCount = 3.5
            break
        case isXl:
            showCount = 4.5;
            break

    }


    const modules = [
        Navigation,
    ]

    if (isOffer) {
        modules.push(Autoplay)

    }

    const rootClassName = cn(
        "my-8",
        {[styles.isOffer]: isOffer}
    )

    return (
        <section className={rootClassName}>

            <div className={styles.titleWrapper}>
                <h1 className="font-bold text-lg">
                    {title}
                </h1>

                <Link href={url} scroll={false}>
                    <p className="text-secondary font-bold">
                        <span>مشاهده همه</span>
                        <ChevronLeft className="text-3xl mr-1"/>
                    </p>
                </Link>
            </div>

            <div className="carouseln relative">
                <Swiper
                    navigation={{
                        prevEl: ".swiper-button-prev-new_" + className,
                        nextEl: ".swiper-button-next-new_" + className,
                    }}
                    slidesPerView={showCount}
                    spaceBetween={0}
                    modules={modules}
                    className="mySwiper"
                    dir="rtl"
                    speed={300}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                >

                    {
                        items?.map((item) => (
                                <SwiperSlide key={item.id} className="flex justify-center">
                                    <MenuItemCard menuItem={item}/>
                                </SwiperSlide>
                            )
                        )
                    }

                </Swiper>

                <button className={cn("swiper-button-next-new_" + className, styles.swiperBtn, styles.left)}>
                    <ChevronLeft className="icon"/>
                </button>

                <button className={cn("swiper-button-prev-new_" + className, styles.swiperBtn, styles.right)}>
                    <ChevronRight className="icon"/>
                </button>

            </div>

        </section>
    );
};

export default MenuShowCaseSection;

