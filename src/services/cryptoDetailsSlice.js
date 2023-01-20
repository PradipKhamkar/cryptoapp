import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  REQUEST: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const cryptoDetailsSlice = createSlice({
  name: "cryptoDetailsSlice",
  initialState: {},
  reducers: {
    setRequest(state, action) {
      return {
        status: STATUSES.REQUEST,
      };
    },
    setCoin(state, action) {
      return {
        status: STATUSES.SUCCESS,
        cryptoDetails: action.payload.data.coin,
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

export const { setCoin, setRequest, setFail } = cryptoDetailsSlice.actions;
export default cryptoDetailsSlice.reducer;

//Api Invoked

//Thunks
export function fetchCryptoDetails(coinId) {
  return async function fetchCrypto(dispatch) {
    try {
      dispatch(setRequest());
      const { data } = await axios.request({
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "e1b58808dfmsh3da1d41991a101ep15461fjsn0565732e7f4d",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      });
      dispatch(setCoin(data));
    } catch (error) {
      dispatch(setFail(error.response.data.message));
    }
  };
}
