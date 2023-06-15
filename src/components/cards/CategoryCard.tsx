import {FC} from 'react';

import Link from "next/link";
import Image from "next/image";

import {motion} from "framer-motion";

import {Category} from "@custom-types/menu";
import styles from "./styles/CatgoryCard.module.css"

interface Props {
    category: Category,
}

const CategoryCard: FC<Props> = ({category}) => {

    const variants = {
        hover: {
            scale: 1.2
        },
        tab: {
            scale: 0.95
        }
    }

    return (
        <Link href={`/search/categories/${category.id}?catTitle=${category.title}`}>
            <motion.article
                className={styles.root}
                whileHover="hover"
                whileTap="tab"
            >
                <motion.div className={styles.img} variants={variants}>
                    <Image src={`/images/categories/${category.pic}`} alt={category.title} width={75} height={75}/>
                </motion.div>
                <p className="font-medium">{category.title}</p>
            </motion.article>
        </Link>
    );
};

export default CategoryCard;