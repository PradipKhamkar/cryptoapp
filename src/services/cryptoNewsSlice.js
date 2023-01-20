import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  REQUEST: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const cryptoNewsSlice = createSlice({
  name: "cryptoNewsSlice",
  initialState: {},
  reducers: {
    setRequest(state, action) {
      return {
        status: STATUSES.REQUEST,
      };
    },
    setNews(state, action) {
      return {
        status: STATUSES.SUCCESS,
        news: action.payload.value,
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

export const { setRequest, setNews, setFail } = cryptoNewsSlice.actions;
export default cryptoNewsSlice.reducer;

//Thunk
export function fetchCryptoNewsApi(count = 100) {
  return async function fetchNews(dispatch) {
    try {
      dispatch(setRequest());
      const { data } = await axios.request({
        method: "GET",
        url: `https://bing-news-search1.p.rapidapi.com/news/search`,
        params: {
          q: "Cryptocurrency",
          freshness: "Day",
          safeSearch: "Off",
          textFormat: "Raw",
          count: count,
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "e1b58808dfmsh3da1d41991a101ep15461fjsn0565732e7f4d",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      });
      dispatch(setNews(data));
    } catch (error) {
      dispatch(setFail(error.response.data.message));
    }
  };
}
