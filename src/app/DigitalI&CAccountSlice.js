import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeButton: "",
    activeTab: "",
    phoneNumber: ""
}

const DigitalICAccountSlice = createSlice({
    name: "digitalICaccount",
    initialState,
    reducers: {
        setActiveButton: (state, action) => {
            state.activeButton = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        }
    }
})

export const { setActiveButton, setActiveTab, setPhoneNumber } = DigitalICAccountSlice.actions;

export default DigitalICAccountSlice.reducer;