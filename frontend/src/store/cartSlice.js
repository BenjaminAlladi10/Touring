import { createSlice} from "@reduxjs/toolkit";

let cartItems= localStorage.getItem("cartItems");
cartItems= cartItems? JSON.parse(cartItems): [];

const cartSlice= createSlice({
    name: "cart",

    initialState: {
        cartItems: cartItems,


    },

    reducers: {
        addMonument: (state, action)=>{
            const monumentItem= action.payload;

            const index= state.cartItems.findIndex((item)=>item._id=== monumentItem._id);
            if(index===-1)
            {
                state.cartItems.push(monumentItem);
            }
            else
            {
                state.cartItems[index].quantity= monumentItem.quantity;
            }
        },

        removeMonument: (state, action)=>{
            const monumentItemId= action.payload;
            state.cartItems= state.cartItems.filter((item)=> item._id!==monumentItemId);
        },

        clearCart: (state, action)=>{
            return {
                cartItems:[]
            };
        }
    }
});

export const {addMonument, removeMonument, clearCart}= cartSlice.actions;
export const cartReducer= cartSlice.reducer;