import { configureStore } from "@reduxjs/toolkit";
import generateSrSlice from "./generateSr-slice";

const store = configureStore({
    reducer: {
        generatesr: generateSrSlice,
    },
});

export default store;