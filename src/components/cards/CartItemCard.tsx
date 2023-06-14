import {FC} from 'react';

import {CartItem} from "@custom-types/cart";
import Image from "next/image";
import {ItemPrice, OrderButtons} from "@components";

const CartItemCard: FC<{ item: CartItem }> = ({item}) => {
    return (
        <article className="col gap-y-3 border-b border-primary-light px-2 py-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-x-3 items-center">
                    <Image
                        src={`/images/menu-items/${item.pic}`}
                        alt={item.title}
                        width={65} height={65}
                        className="rounded-lg border border-primary"
                    />
                    <p className="font-bold">{item.title}</p>
                </div>
                <p className="font-bold text-lg text-primary">
                    {item.quantity}
                    {" "}
                    عدد
                </p>
            </div>
            <div className="spacing-row">
                <ItemPrice
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    discountPercentage={item.discountPercentage}
                    size="lg"
                />
                <OrderButtons item={item}/>
            </div>
        </article>
    );
};

export default CartItemCard;