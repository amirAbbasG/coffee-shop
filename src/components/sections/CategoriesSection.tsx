import {FC} from 'react';

import {Category} from "@custom-types/menu";
import {CategoryCard} from "@components";

interface Props {
    categories: Category[]
}
const CategoriesSection: FC<Props> = ({categories}) => {
    return (
        <section className="flex justify-between md:justify-center overflow-x-auto pt-10 pb-3 mb-8 gap-x-5 md:gap-x-12">
            {
                categories.map(c => (
                    <CategoryCard category={c} key={c.id} />
                ))
            }
        </section>
    );
};

export default CategoriesSection;