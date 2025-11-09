import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../Slices/UserSlice.js";


const store = configureStore({
     reducer:{
        user:userSlice,
     }
});

export default store