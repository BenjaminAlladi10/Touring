import { createSlice} from "@reduxjs/toolkit";

let cartItems= localStorage.getItem("cartItems");
cartItems= cartItems? JSON.parse(cartItems): [];

const cartSlice= createSlice({
    name: "cart",

    initialState: {
        items: cartItems,
    },

    reducers: {

        addMonument: (state, action)=>{
            const newMonument= action.payload;
            state.items.push(newMonument);
        },

        removeMonument: (state, action)=>{
            state.items= state.items.filter((item)=> item.id!==action.payload);
        },

        clearCart: (state, action)=>{
            return {
                items:[]
            };
        }
    }
});

export const {addMonument, removeMonument, clearCart}= cartSlice.actions;
export const cartReducer= cartSlice.reducer;