import {FC, useState} from 'react';

import {Drawer} from "@mui/material";
import Image from "next/image";

import {FilterItem, PriceRangeSlider, RenderIf} from "@components";
import styles from "./styles/FilterItemDrawer.module.css"
import {ModalProps} from "@custom-types/props";
import {Category} from "@custom-types/menu";
import {isEmpty} from "@utils/helpers";
import Link from "next/link";


type Props = ModalProps & {
    categories?: Category[] | null
}
const FilterItemsDrawer: FC<Props> = ({open, handleClose, categories}) => {
    const [justOffer, setJustOffer] = useState(false);
    const [justDiscounted, setJustDiscounted] = useState(false);

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{
                className: "w-[94%] max-w-lg hide-scrollbar"
            }}
            SlideProps={{direction: "left"}}
            anchor="right"

        >
            <div className={styles.header}>
                فیلتر ها
            </div>
            <div className={styles.root}>
                {/*filter by category*/}
                <RenderIf isTrue={!isEmpty(categories)}>
                    <h4>
                        فیلتر دسته بندی
                    </h4>
                    <section>
                        {
                            categories?.map(c => (
                                <Link href={`/search/categories/${c.id}?catTitle=${c.title}`} key={c.id} className={styles.cat}>
                                    <div className={styles.catImgWrapper}>
                                        <Image src={`/images/categories/${c.pic}`} alt={c.title} width={35} height={35}/>
                                    </div>
                                    <p>{c.title}</p>
                                </Link>
                            ))
                        }
                    </section>
                </RenderIf>

                {/*filter by options*/}
                <h4>
                    فیلتر تخفیف
                </h4>
                <section className="space-y-4">
                    <FilterItem
                        value={justDiscounted}
                        onToggle={e => setJustDiscounted(e.target.checked)}
                        title="آیتم های دارای تخفیف"
                    />
                    <FilterItem
                        value={justOffer}
                        onToggle={e => setJustOffer(e.target.checked)}
                        title="آیتم های پیشنهاد ویژه"
                    />
                </section>

                {/*filter by price*/}
                <h4>
                    فیلتر قیمت
                </h4>
                <PriceRangeSlider onSubmit={() => {
                }}/>

            </div>
        </Drawer>
    );
};

export default FilterItemsDrawer;

