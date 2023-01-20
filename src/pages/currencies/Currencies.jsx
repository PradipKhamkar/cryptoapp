import React, { useEffect, useState } from "react";
import "./Currencies.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../../services/cryptoApiSlice";
import CoinCart from "../../components/cart/CoinCart";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const Currencies = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const { status, coins, stat, error } = useSelector(
    (state) => state.cryptoCoins
  );

  let cryptoData = [];

  if (status === "success") {
    cryptoData = coins ? coins : [];
  }

  if (keyword !== "") {
    const filterCrypto = cryptoData.filter((coin) =>
      coin.name.toLowerCase().includes(keyword.toLowerCase())
    );
    cryptoData = filterCrypto;
  }
  useEffect(() => {
    dispatch(fetchCrypto(100));
  }, [keyword]);

  if (status === "loading")
    return <Loader loadingName={"Loading Currencies"} />;

  return (
    <div className="currencies__container">
      <br />
      <div className="search__crypto">
        <input
          type="text"
          placeholder="Search Crypto..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search__coin"
        />
      </div>
      {status == "success" ? (
        <>
          {cryptoData.length != 0 ? (
            <div className="currencies__wrapper">
              <div className="currencies__cart">
                <CoinCart coinsData={cryptoData} />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Currencies;
