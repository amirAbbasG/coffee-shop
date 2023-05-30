import React from 'react';
import {useAppSelector} from "@hooks/redux-hooks";
import {CartItemCard, CartLayout} from "@components";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {NextSeo} from "next-seo";

const FinalizeCart = () => {
    const router = useRouter()
    const cart = useAppSelector(state => state.cart)

    const renderActions = () => (
        <div className="flex gap-x-2">
            <Button
                variant="contained"
                className="button w-1/2"
                // onClick={() => router.push("/out-order")}
            >
                سفارش در کافه
            </Button>
            <Button
                variant="outlined"
                className="border-primary-dark w-1/2"
                onClick={() => router.push("/out-order")}
            >
                سفارش بیرون کافه
            </Button>
        </div>
    )

    return (
        <>
            <NextSeo
                title="نهایی کردن سبد خرید"
                description=""
                openGraph={{
                    url: "https://www.coffee-shop.ie/finalize-cart",
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                }}
            />
            <CartLayout renderActions={renderActions()}>
                <h5 className="mt-8 mb-2 text-center font-bold text-secondary-dark">
                    آیتم های سبد خرید
                </h5>

                {
                    cart?.items?.map(i => (
                        <CartItemCard item={i} key={i.id}/>
                    ))
                }
            </CartLayout>
        </>
    );
};

export default FinalizeCart;
