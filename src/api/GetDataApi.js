import React from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { settingData, settingObjectData } from "../app/AppSlice";

function useGetDataApi() {
  const dispatch = useDispatch();
  const phoneNumber = "96143543";

  const GetData = async () => {
    try {
      const response = await axios.get(`http://10.20.80.79/getData/${phoneNumber}`);
      dispatch(settingData({ field: "userData", value: response.data.data }));
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  };
  const GetAllUSerData = async () => {
    try {
      const response = await axios.get(`http://10.20.80.79/getData`);
      dispatch(settingData({ field: "userAllData", value: response.data.data }));
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  };

  return {
    GetData,
    GetAllUSerData
  };
}

export default useGetDataApi;
