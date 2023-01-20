import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  REQUEST: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const cryptoApiSlice = createSlice({
  name: "cryptoSlice",
  initialState: {},
  reducers: {
    setRequest(state, action) {
      return {
        status: STATUSES.REQUEST,
      };
    },
    setCoins(state, action) {
      return {
        status: STATUSES.SUCCESS,
        coins: action.payload.data.coins,
        stat: action.payload.data.stats,
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

export const { setCoins, setRequest, setFail } = cryptoApiSlice.actions;
export default cryptoApiSlice.reducer;

//Api Invoked

//Thunks
export function fetchCrypto(count = 100) {
  return async function fetchCryptoThunk(dispatch) {
    try {
      dispatch(setRequest());
      const { data } = await axios.request({
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
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
      dispatch(setCoins(data));
    } catch (error) {
      dispatch(setFail(error.response.data.message));
    }
  };
}
