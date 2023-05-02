import {CaseReducer, createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";

import {Cart, CartItem} from "@custom-types/cart";


type ActionType<PT> = CaseReducer<Cart, PayloadAction<PT>>

const initialState = {
    id: "1",
    totalPrice: 0,
    totalDiscountedPrice: 0,
    totalCount: 0,
    items: []
} as Cart

//#region actions
const setCartAction: ActionType<Cart> = (state, action) => {
    return action.payload
}

const addToCartAction: ActionType<CartItem> = (state, action) => {
    const item = action.payload
    const findIndex = state.items.findIndex(i => i.id === item.id)
    if (findIndex > -1) {
        state.items[findIndex].quantity += 1
    } else {
        state.items = [...state.items, item]
    }
    state.totalPrice += item.price
    state.totalDiscountedPrice += item.discountedPrice
    state.totalCount += 1
}

const removeFromCartAction: ActionType<string> = (state, action) => {
    const itemId = action.payload
    const findIndex = state.items.findIndex(i => i.id === itemId)
    if (findIndex > -1) {
        state.totalPrice -= state.items[findIndex].price
        state.totalDiscountedPrice -= state.items[findIndex].discountedPrice
        state.totalCount -= 1
        if (state.items[findIndex].quantity > 1) {
            state.items[findIndex].quantity -= 1
        } else {
            state.items = [...state.items].filter(i => i.id !== itemId)
        }
    }
}

const setDeliveryTimeAction: ActionType<string> = (state, action) => {
    state.userDeliveryTime = action.payload
}
//#endregion

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: setCartAction,
        addToCart: addToCartAction,
        removeFromCart: removeFromCartAction,
        setDeliveryTime: setDeliveryTimeAction
    }
})

export const {setCart, addToCart, removeFromCart, setDeliveryTime} = cartSlice.actions

export default cartSlice.reducer as Reducer<Cart>