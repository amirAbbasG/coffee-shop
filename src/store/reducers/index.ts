import {combineReducers} from "redux";
import cartReducer from "@store/reducers/cartReducer";


const reducer = combineReducers({
    cart: cartReducer
})

export default reducer