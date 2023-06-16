import {FC} from "react";

import {Button} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

import {isEmpty} from "@utils/helpers";
import {useAppDispatch, useAppSelector} from "@hooks/redux-hooks";
import {CartItem} from "@custom-types/cart";
import {addToCart, removeFromCart} from "@store/reducers/cartReducer";

interface Props {
    item: CartItem,
}

const OrderButtons: FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();

    const cart = useAppSelector(state => state.cart)

    const itemInCart = cart?.items?.find((i) => i.id === item.id);

    let itemCountInOrder = 0;

    if (!isEmpty(cart)) {

        if (itemInCart) {
            itemCountInOrder = itemInCart.quantity
        }

    }


    const handleMinus = () => {
       dispatch(removeFromCart(item.id))
    };

    const handleAdd = () => {
        // if (isEmpty(account)) {
        //     errorMessage("برای افزودن به سبد خرید وارد حساب کاربری خود شوید");
        //     return
        // }
        dispatch(addToCart(item))
    };

    const iconButtonClass = "p-2 absolute -top-[7px] border-2 border-secondary-light rounded-full"

    return (
        <>
            {itemCountInOrder > 0 ? (
                <div className="flex items-end gap-x-2 bg-primary-light relative w-24 py-1 text-white h-fit">
                    <button className={`${iconButtonClass} bg-primary -right-2`} onClick={handleAdd}>{<Add/>}</button>
                    <p className="font-bold mx-auto">{itemCountInOrder}</p>
                    <button className={`${iconButtonClass} bg-red-700 -left-2`} onClick={handleMinus}>
                        {
                            itemCountInOrder > 1 ?
                                <Remove/>
                                : <DeleteOutlined/>
                        }
                    </button>

                </div>
            ) : (

                <Button
                    className="button"
                    onClick={handleAdd}
                    sx={{height: "45px", width: "fit-content", fontWeight: "bold"}}
                    startIcon={<AddShoppingCart/>}
                    variant="contained"
                >
                    افزودن به سبد
                </Button>
            )}
        </>
    );
};

export default OrderButtons;
