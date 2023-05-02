import React, {FC, ReactNode} from 'react';

import {ChildrenProps} from "@custom-types/props";
import styles from "./styles/CartLayout.module.css"
import cn from "classnames";
import {useAppSelector} from "@hooks/redux-hooks";
import {separatePrice} from "@utils/helpers";

interface Props {
    renderActions: ReactNode | ReactNode[]
}

interface FactorItemProps {
    title: string,
    value: any,
    className?: string
}

const FactorItem: FC<FactorItemProps> = ({title, value, className}) => (
    <div className={`spacing-row p-2 ${className || ""}`}>
        <span className="font-bold">{title}</span>
        <span>{separatePrice(value)}</span>
    </div>
)

const CartLayout: FC<ChildrenProps<Props>> = ({children, renderActions}) => {
    const cart = useAppSelector(state => state.cart)

    return (
        <div className={styles.root}>
            <div className={cn(styles.box, "lg:w-2/3")}>
                {children}
            </div>
            <div className={cn(styles.box, "lg:w-1/3 relative")}>
                <FactorItem title="مبلغ کل" value={cart.totalPrice}/>
                <FactorItem
                    title="سود شما"
                    value={cart.totalPrice - cart.totalDiscountedPrice}
                    className=" border-b border-primary-light"
                />
                <FactorItem
                    title="مبلغ نهایی"
                    value={cart.totalDiscountedPrice}
                    className="text-secondary-dark"
                />
                <div className={styles.actionsWrapper}>
                    {renderActions}
                </div>
            </div>
        </div>
    );
};

export default CartLayout;