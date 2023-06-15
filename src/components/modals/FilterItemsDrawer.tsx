import {FC, useState} from 'react';

import Image from "next/image";
import Link from "next/link";

import {motion} from "framer-motion";
import {Drawer} from "@mui/material";

import {FilterItem, PriceRangeSlider, RenderIf} from "@components";
import styles from "./styles/FilterItemDrawer.module.css"
import {ModalProps} from "@custom-types/props";
import {Category} from "@custom-types/menu";
import {isEmpty} from "@utils/helpers";
import {liVariants, ulVariants} from "@components/modals/styles/motion-variants";


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
            <motion.div
                initial="closed"
                animate={open ? "open" : "closed"}
                className={styles.root}
            >
                {/*filter by category*/}
                <RenderIf isTrue={!isEmpty(categories)}>
                    <h4 className="mb-5">
                        فیلتر دسته بندی
                    </h4>
                    <motion.ul variants={ulVariants} className="mb-5">
                        {
                            categories?.map(c => (
                                <motion.li
                                    key={c.id} className="mb-5"
                                    variants={liVariants}
                                    whileHover={{scale: 1.04}}
                                    whileTap={{scale: 0.95}}
                                >
                                    <Link href={`/search/categories/${c.id}?catTitle=${c.title}`}
                                          className={styles.cat}>
                                        <div className={styles.catImgWrapper}>
                                            <Image src={`/images/categories/${c.pic}`} alt={c.title} width={35}
                                                   height={35}/>
                                        </div>
                                        <p>{c.title}</p>
                                    </Link>
                                </motion.li>
                            ))
                        }
                    </motion.ul>
                </RenderIf>

                {/*filter by options*/}
                <motion.section className="space-y-4" variants={liVariants}>
                    <h4>
                        فیلتر تخفیف
                    </h4>
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
                </motion.section>

                {/*filter by price*/}
                <motion.section variants={liVariants}>
                    <h4>
                        فیلتر قیمت
                    </h4>
                    <PriceRangeSlider onSubmit={() => {
                    }}/>
                </motion.section>

            </motion.div>
        </Drawer>
    );
};

export default FilterItemsDrawer;

