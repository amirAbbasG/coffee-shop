import React, {FC} from 'react';

import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

import {ParsedUrlQuery} from "querystring";
import {Rating} from "@mui/material";
import {NextSeo} from "next-seo";

import {MenuItem, MenuShowCase} from "@custom-types/menu";
import {ImageGallery, ItemPrice, MenuShowCasesSection, OrderButtons, RenderIf} from "@components";
import styles from "@styles/ItemDetials.module.css"
import {CartItem} from "@custom-types/cart";
import UserComments from "@components/sections/UserComments";
import {getMultipleRandom} from "@utils/helpers";
import comments from "@dev-data/user-comments.json"
import menuItems from "@dev-data/menu-items.json"
import menuItemsData from "@dev-data/menu-items.json";

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
    menuItem: MenuItem | undefined,
    relatedItems: MenuShowCase
}

interface StaticParams extends ParsedUrlQuery {
    itemId: string
}

export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = async ({params}) => {
    const menuItem: MenuItem | undefined = menuItems.find(i => i.id === params?.itemId)
    if (menuItem) {
        menuItem.comments = comments
    }

    const relatedItems: MenuShowCase = {
        id: "6",
        title: "آیتم های مرتبط",
        url: "/",
        items: getMultipleRandom(menuItemsData, 7),
    }

    return {
        props: {
            menuItem,
            relatedItems
        }
    }
}

const ItemDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({menuItem, relatedItems}) => {
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
        <>
            <NextSeo
                title={title}
                description=""
                openGraph={{
                    url: `https://www.coffee-shop.ie/item/${id}`,
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                }}
            />
            <div className={styles.root}>
                <div className={styles.infoBox}>
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

                <RenderIf isTrue={!!relatedItems}>
                    <MenuShowCasesSection menuShowCase={relatedItems!} className={"showCase" + relatedItems?.id}
                                          key={relatedItems?.id}/>
                </RenderIf>

                <RenderIf isTrue={!!menuItem}>
                    <UserComments comments={menuItem?.comments!} addId={menuItem?.id}/>
                </RenderIf>
            </div>

        </>
    );
};

export default ItemDetails;
