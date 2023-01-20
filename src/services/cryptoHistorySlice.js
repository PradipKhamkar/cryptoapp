import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  REQUEST: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const cryptoHistorySlice = createSlice({
  name: "cryptoHistorySlice",
  initialState: {},
  reducers: {
    setRequest(state, action) {
      return {
        status: STATUSES.REQUEST,
      };
    },
    setCoinHistory(state, action) {
      return {
        status: STATUSES.SUCCESS,
        coinHistory: action.payload.data,
      };
    },
    setFail(state, action) {
      return {
        ...state,
        status: STATUSES.ERROR,
        error: action.payload,
      };
    },
  },
});

export const { setCoinHistory, setRequest, setFail } =
  cryptoHistorySlice.actions;
export default cryptoHistorySlice.reducer;

//Api Invoked
//Thunks
export function fetchCryptoHistory(coinId, timePeriod) {
  return async function fetchHistory(dispatch) {
    try {
      dispatch(setRequest());
      const { data } = await axios.request({
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: timePeriod,
        },
        headers: {
          "X-RapidAPI-Key":
            "e1b58808dfmsh3da1d41991a101ep15461fjsn0565732e7f4d",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      });
      dispatch(setCoinHistory(data));
    } catch (error) {
      dispatch(setFail(error.response.data.message));
    }
  };
}
