import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import DigitalICAccountSlice from "./DigitalI&CAccountSlice";

const store = configureStore({
  reducer: {
    digitalICaccount: DigitalICAccountSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
