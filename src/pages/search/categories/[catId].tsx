import {FC, useState} from 'react';

import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import {ParsedUrlQuery} from "querystring";
import TuneIcon from '@mui/icons-material/Tune';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";

import {Category, MenuItem} from "@custom-types/menu";
import menuItems from "@dev-data/menu-items.json"
import categoriesData from "@dev-data/categories.json"
import {FilterItemsDrawer, MenuItemCard} from "@components";
import SortProductsSelect from "@components/modals/SortItemsSelect";


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
    const [sortType, setSortType] = useState("0");
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <>
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