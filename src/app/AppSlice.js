import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  parameters: null,
  mobileResponse: "",
  flag: null,
  headerData: {
    title: "IC",
    backLink: "",
    currentPage: "",
  },
  popup: false,
  userData: {}, 
  userAllData: {}, 
};

const AppSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    settingData: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    settingObjectData: (state, action) => {
      const { mainField, field, value } = action.payload;
      state[mainField][field] = value;
    },

    resetData: (state) => {
      state.mobileResponse = "";
      state.headerData = { title: "IC", backLink: "", curretPage: "" };
      state.flag = null;
      state.userData = {
        user: {},
      };
    },
  },
});

export const { settingData, settingObjectData, resetData } = AppSlice.actions;

export default AppSlice.reducer;
