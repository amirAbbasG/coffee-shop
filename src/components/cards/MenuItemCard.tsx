import {FC} from 'react';

import Link from "next/link";
import Image from "next/image";

import {motion} from "framer-motion";

import {MenuItem} from "@custom-types/menu";
import styles from "./styles/MenuItemCard.module.css"
import {ItemPrice} from "@components";

interface Props {
    menuItem: MenuItem
}

const MenuItemCard: FC<Props> = ({menuItem}) => {
    return (
        <motion.article
            className={styles.root}
            whileHover={{scale: 1.04}}
            whileTap={{scale: 0.9}}
        >
            <Link href={`/item/${menuItem.id}`} className="card-link"/>
            <div className={styles.imgWrapper}>
                <Image src={`/images/menu-items/${menuItem.pic}`} alt={menuItem.title} fill className="object-center"/>
            </div>
            <div className={styles.details}>
                <div>
                    <p className="font-semibold mb-2">{menuItem.title}</p>
                    <p className="text-gray-400 font-light">{menuItem.category.title}</p>
                </div>
                <ItemPrice
                    price={menuItem.price}
                    discountedPrice={menuItem.discountedPrice}
                    discountPercentage={menuItem.discountPercentage}
                    size="sm"
                />
            </div>

        </motion.article>
    );
};

export default MenuItemCard;