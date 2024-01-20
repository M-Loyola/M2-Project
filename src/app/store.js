import {configureStore} from "@reduxjs/toolkit";
import inventoryReducer from "../reducers/inventoryReducer";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
    },
});