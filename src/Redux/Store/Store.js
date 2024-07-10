import { configureStore } from "@reduxjs/toolkit";
import  AutSliceRrducer from '../Slice/AutSlice'
import DataSlice from "../Slice/DataSlice";

const store=configureStore({
    reducer:{
        Auth: AutSliceRrducer,
        CarData:DataSlice
    }
})

export default store