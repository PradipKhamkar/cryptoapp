import React from "react";
import millify from "millify";
import "./CoinCart.css";
import { Link } from "react-router-dom";

const CoinCart = ({ coinsData }) => {
  return (
    <>
      {coinsData &&
        coinsData.map((coin) => {
          return (
            <div className="coin__cart" key={coin.id}>
              <Link to={`/crypto/${coin.uuid}`}>
                <div className="coin__cart__header" key={coin.id + "1234"}>
                  <h6 className="coin__cart__heading">
                    # {coin.rank} {coin.name}
                  </h6>
                  <img src={coin.iconUrl} alt="coin_icon" width={"20px"} />
                </div>
                <div className="coin__cart__details" key={coin.id + "123"}>
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)} %</p>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default CoinCart;
