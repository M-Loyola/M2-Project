import {createSlice} from "@reduxjs/toolkit";

const inventoryReducer = createSlice({
    name: "inventory",
    initialState: {
        inventoryList: []
    },
    reducers: {
        resetInventoryList: (state, action) => {
            state.inventoryList = action.payload;
        }
    }
})
export const {
    resetInventoryList
} = inventoryReducer.actions;

export default  inventoryReducer.reducer;
