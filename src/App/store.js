import { configureStore } from "@reduxjs/toolkit";
import cryptoApiSlice from "../services/cryptoApiSlice";
import cryptoDetailsSlice from "../services/cryptoDetailsSlice";
import cryptoHistorySlice from "../services/cryptoHistorySlice";
import cryptoNewsSlice from "../services/cryptoNewsSlice";

const store = configureStore({
  reducer: {
    cryptoCoins: cryptoApiSlice,
    cryptoNews: cryptoNewsSlice,
    cryptoDetails: cryptoDetailsSlice,
    cryptoCoinHistory: cryptoHistorySlice,
  },
});

export default store;
