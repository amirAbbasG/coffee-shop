import {FC, useState} from 'react';

import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import {NextSeo} from "next-seo";
import {ParsedUrlQuery} from "querystring";
import TuneIcon from '@mui/icons-material/Tune';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";

import {Category, MenuItem} from "@custom-types/menu";
import menuItems from "@dev-data/menu-items.json"
import categoriesData from "@dev-data/categories.json"
import {MenuItemCard} from "@components";
import SortProductsSelect from "@components/modals/SortItemsSelect";
import dynamic from "next/dynamic";

const FilterItemsDrawer = dynamic(() => import("@components/modals/FilterItemsDrawer"))


interface ServerSideProps {
    items: MenuItem[],
    categories?: Category[]
}

interface ServerSideParams extends ParsedUrlQuery {
    catId: string
}

//get server side props
export const getServerSideProps: GetServerSideProps<ServerSideProps, ServerSideParams> = async ({params}) => {
    const items = menuItems.filter(i => i.category.id === params?.catId || i.category.parentId === params?.catId)
    const categories = categoriesData.filter(c => c.parentId === params?.catId )

    return {
        props: {
            items,
            categories
        }
    }
}


const SearchByCategory: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({items, categories}) => {
    const router = useRouter()
    const {catId, catTitle} = router.query

    const [sortType, setSortType] = useState("0");
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <>
            <NextSeo
                title={catTitle as string || "سرچ با دسته بندی"}
                description=""
                openGraph={{
                    url: `https://www.coffee-shop.ie/categories/${catId}`,
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                }}
            />
            <div className="spacing-row mb-5 px-12">
                <Button
                    variant="outlined"
                    sx={{py: 10, px: 20}}
                    startIcon={<TuneIcon/>}
                    onClick={() => setOpenFilter(true)}
                >
                    فیلترها
                </Button>

                <SortProductsSelect handleChangeSort={setSortType} activeValue={sortType}/>
            </div>
            <Grid2 container justifyContent="center" spacing={2}>
                {items?.map(i => (
                    <Grid2 key={i.id} xs="auto">
                        <MenuItemCard menuItem={i}/>
                    </Grid2>
                ))}
            </Grid2>

            <FilterItemsDrawer open={openFilter} handleClose={() => setOpenFilter(false)} categories={categories}/>
        </>
    );
};

export default SearchByCategory;