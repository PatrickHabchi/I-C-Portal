import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { settingData, settingObjectData } from "../app/AppSlice";

function useGetDataApi() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(state => state.digitalICaccount.phoneNumber);

  console.log("phoneNumber", phoneNumber);

  const GetData = async () => {
    try {
      const response = await axios.get(`https://ubuntunbk.suyool.com/getData/${phoneNumber}`);
      dispatch(settingData({ field: "singleUserData", value: response.data.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const GetAllUserData = async () => {
    try {
      const response = await axios.get(`https://ubuntunbk.suyool.com/getData`);
      dispatch(settingData({ field: "userData", value: response.data.data }));

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  };

  return {
    GetData,
    GetAllUserData
  };
}

export default useGetDataApi;
