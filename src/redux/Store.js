import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./EnrollSlice";


export const store=configureStore(
    {
        reducer:{
            cart:cartSlice,
        }
    }
)
