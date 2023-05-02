import React, {FC} from 'react';

import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

import {ParsedUrlQuery} from "querystring";
import {Rating} from "@mui/material";

import menuItems from "@dev-data/menu-items.json"
import {MenuItem} from "@custom-types/menu";
import {ImageGallery, ItemPrice, OrderButtons} from "@components";
import styles from "@styles/ItemDetials.module.css"
import {CartItem} from "@custom-types/cart";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = menuItems.map(i => ({
        params: {itemId: i.id}
    }))

    return {
        paths,
        fallback: false
    }
}

interface StaticProps {
    menuItem: MenuItem | undefined
}

interface StaticParams extends ParsedUrlQuery {
    itemId: string
}

export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = async ({params}) => {
    const menuItem = menuItems.find(i => i.id === params?.itemId)

    return {
        props: {
            menuItem
        }
    }
}

const ItemDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({menuItem}) => {
    const {id, title, price, discountedPrice, discountPercentage, pic, description, category} = menuItem!
    const cartItem: CartItem = {
        id,
        title,
        price,
        discountPercentage,
        discountedPrice,
        pic,
        quantity: 1
    }
    return (
        <div className={styles.root}>

            <ImageGallery
                imageList={[
                    `/images/menu-items/${menuItem?.pic}`,
                    `/images/menu-items/${menuItem?.pic}`,
                    `/images/menu-items/${menuItem?.pic}`,
                    `/images/menu-items/${menuItem?.pic}`,
                    `/images/menu-items/${menuItem?.pic}`,
                    `/images/menu-items/${menuItem?.pic}`
                ]}/>
            <div className={styles.detailsWrapper}>
                <div className="spacing-row">
                    <h5>{menuItem?.title}</h5>
                    <Rating
                        size="small" name="read-only"
                        value={4}
                        readOnly
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: 'primary.main',
                            },
                        }}/>
                </div>
                <p className="text-gray-800">
                    <span className="font-bold">دسته بندی:</span>
                    {" "}
                    {category.title}
                </p>
                <p className="text-justify text-gray-700">{description}</p>
            </div>

            <div className={styles.footer}>
                <ItemPrice
                    price={menuItem?.price || 0}
                    discountedPrice={menuItem?.discountedPrice || 0}
                    discountPercentage={menuItem?.discountPercentage || 0}
                    size="lg"
                    />
                <OrderButtons item={cartItem}/>
            </div>
        </div>
    );
};

export default ItemDetails;