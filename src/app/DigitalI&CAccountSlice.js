import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeButton: "",
    activeTab: ""
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
        }
    }
})

export const { setActiveButton, setActiveTab } = DigitalICAccountSlice.actions;

export default DigitalICAccountSlice.reducer;