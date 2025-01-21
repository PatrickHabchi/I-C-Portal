import React from 'react';
import axios from 'axios';

function useGetDataApi() {
  const phoneNumber = "96143543";

  const GetData = async () => {
    try {
      const response = await axios.get(`http://10.20.80.79/getData/${phoneNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  };

  return {
    GetData,
  };
}

export default useGetDataApi;
