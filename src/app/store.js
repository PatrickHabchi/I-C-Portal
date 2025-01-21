import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import DigitalICAccountSlice from "./DigitalI&CAccountSlice";
import AppReducer from "./AppSlice";
const store = configureStore({
  reducer: {
    digitalICaccount: DigitalICAccountSlice,
    appData: AppReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
