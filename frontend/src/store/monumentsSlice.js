import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchMonuments= createAsyncThunk("monuments/fetchMonuments", async()=>{
    try {
        const response = await axios.get("api/v1/monuments/getallmonuments");
        // console.log("response:", response);
        return response.data.data;
    } 
    catch (err) {
        console.log("Error in get request");
        console.error("Error is:", err.message);
        return err;
    }
});

const monumentsSlice= createSlice({
    name: "monuments",

    initialState: {
        monuments: [],

        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },

    reducers: {},

    extraReducers: (builder)=>{
        builder
            .addCase(fetchMonuments.pending, (state, action)=>{
                state.status= "pending";
            })
            .addCase(fetchMonuments.fulfilled, (state, action)=>{
                state.status= "fulfilled";
                state.monuments= action.payload;
            })
            .addCase(fetchMonuments.rejected, (state, action)=>{
                state.status= "rejected";
                state.monuments= action.error.message;
            })
    }
});

export const monumentsReducer= monumentsSlice.reducer;
export {fetchMonuments};