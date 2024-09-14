import { createSlice} from "@reduxjs/toolkit";

let cartItems= localStorage.getItem("cartItems");
cartItems= cartItems? JSON.parse(cartItems): [];

const cartSlice= createSlice({
    name: "cart",

    initialState: {
        cartItems: cartItems,
        cartTotalQuantity: 0,
        cartTotalAmount:0
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
            state.cartItems.length=0;

            // return {
            //     cartItems:[]
            // };
        },

        getTotals: (state, action)=>{
            const data= state.cartItems.reduce((acc, item, index)=>{
                const {price, quantity}= item;

                acc.cartTotalQuantity+= quantity;
                acc.cartTotalAmount+= (price*quantity);

                return acc;
            }, {cartTotalQuantity:0, cartTotalAmount:0});

            state.cartTotalQuantity= data.cartTotalQuantity;
            state.cartTotalAmount= data.cartTotalAmount;
        }
    }
});

export const {addMonument, removeMonument, clearCart, getTotals}= cartSlice.actions;
export const cartReducer= cartSlice.reducer;