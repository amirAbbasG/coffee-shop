import {FC} from 'react';

import {useRouter} from "next/router";

import {Button, Drawer} from "@mui/material";
import {motion} from "framer-motion";

import {ModalProps} from "@custom-types/props";
import {useAppSelector} from "@hooks/redux-hooks";
import {CartItemCard} from "@components";
import {separatePrice} from "@utils/helpers";
import styles from "@components/modals/styles/FilterItemDrawer.module.css";
import {ulVariants} from "@components/modals/styles/motion-variants";


const CartDrawer: FC<ModalProps> = ({open, handleClose}) => {
    const cart = useAppSelector(state => state.cart)
    const router = useRouter()

    const handleConfirmOrder = async () => {
        await router.push("/finalize-cart")
        handleClose()
    }


    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{
                className: "w-[94%] max-w-xl hide-scrollbar"
            }}
            SlideProps={{direction: "right"}}
            anchor="left"

        >
            <h5 className=" py-3 mb-5 text-center text-white font-bold tracking-wide bg-secondary sticky top-0 z-10">
                {`سبد خرید (${cart.totalCount} عدد)`}
            </h5>
            <motion.ul
                className="col gap-y-2 p-4"
                variants={ulVariants}
                initial="closed"
                animate={open ? "open" : "closed"}
            >

                {
                    cart?.items?.map(i => (
                        <CartItemCard item={i} key={i.id}/>
                    ))
                }
            </motion.ul>
            <div className="flex-grow"/>
            <div className="flex justify-between p-3 bg-secondary-light sticky bottom-0 z-10">
                <div>
                    <p className="text-gray-800">
                        {`مبلغ کل : ${separatePrice(cart.totalPrice)} ریال`}
                    </p>
                    <p className="mt-2 font-bold" >
                        {`مبلغ کل پس از تخفیف : ${separatePrice(cart.totalDiscountedPrice)} ریال`}
                    </p>
                </div>
                <Button onClick={handleConfirmOrder} className="button" variant="contained">
                    ثبت سفارش
                </Button>
            </div>
        </Drawer>
    );
};

export default CartDrawer;

