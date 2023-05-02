import {FC} from 'react';

import Link from "next/link";

import {Category} from "@custom-types/menu";
import styles from "./styles/CatgoryCard.module.css"
import Image from "next/image";

interface Props {
    category: Category,
}

const CategoryCard: FC<Props> = ({category}) => {
    return (
        <Link href={`/search/categories/${category.id}`}>
            <div className={ styles.root}>
                <Image src={`/images/categories/${category.pic}`} alt={category.title} width={75} height={75} className={styles.img}/>
                <p className="font-medium">{category.title}</p>
            </div>
        </Link>
    );
};

export default CategoryCard;