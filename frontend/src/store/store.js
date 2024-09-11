import {configureStore} from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { monumentsReducer } from "./monumentsSlice";

const appStore= configureStore({
    reducer:{
        "cart": cartReducer,
        "monuments": monumentsReducer
    }
});

export default appStore;