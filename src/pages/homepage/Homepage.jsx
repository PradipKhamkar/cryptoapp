import React, { useEffect } from "react";
import "./HomePage.css";
import millify from "millify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../../services/cryptoApiSlice";
import { fetchCryptoNewsApi } from "../../services/cryptoNewsSlice";
import CoinCart from "../../components/cart/CoinCart";
import NewsCart from "../../components/news/NewsCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { TbMilitaryRank } from "react-icons/tb";
import { HiArrowCircleUp } from "react-icons/hi";
import { GiCrownCoin } from "react-icons/gi";
import { RiExchangeFill, RiCoinsFill } from "react-icons/ri";
import {
  MdVerifiedUser,
  MdVerified,
  MdOutlineAccessTimeFilled,
  MdError,
} from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { GiTwoCoins } from "react-icons/gi";
import { SiScrimba } from "react-icons/si";

const Homepage = () => {
  const dispatch = useDispatch();
  const { status, coins, stat, error } = useSelector(
    (state) => state.cryptoCoins
  );

  const {
    status: newsStatus,
    news,
    error: newsError,
  } = useSelector((state) => state.cryptoNews);

  useEffect(() => {
    dispatch(fetchCrypto(10));
    dispatch(fetchCryptoNewsApi(4));
  }, []);

  if (status === "loading" || newsStatus === "loading")
    return <Loader loadingName={"Loading Home"} />;
  return (
    <div className="home__section">
      <h2 className="home__title">Global Crypto Stats</h2>
      {error && newsError ? (
        <>
          <Error errorName={"Somethings Went's Wrong..!!"} />
        </>
      ) : (
        <>
          {status == "success" || newsStatus == "success" ? (
            <>
              <div className="global__crypto__stats container">
                <div className="global__crypto__cart">
                  <h4>
                    <RiCoinsFill /> <br /> Total Cryptocurrencies
                  </h4>
                  <span>{stat.total}</span>
                </div>
                <div className="global__crypto__cart">
                  <h4>
                    <RiExchangeFill /> <br /> Total Exchanges
                  </h4>
                  <span>{millify(stat.totalExchanges)}</span>
                </div>
                <div className="global__crypto__cart">
                  <h4>
                    {" "}
                    <SiScrimba /> <br /> Total Market Cap
                  </h4>
                  <span>{millify(stat.totalMarketCap)}</span>
                </div>
                <div className="global__crypto__cart">
                  <h4>
                    {" "}
                    <MdOutlineAccessTimeFilled /> <br /> Total 24h Volume
                  </h4>
                  <span>{millify(stat.total24hVolume)}</span>
                </div>
                <div className="global__crypto__cart">
                  <h4>
                    {" "}
                    <TbMilitaryRank /> <br /> Total Markets
                  </h4>
                  <span>{millify(stat.totalMarkets)}</span>
                </div>
              </div>
              <br />
              <br />
              <div className="top__ten__crypto">
                <div className="heading__section">
                  <h2 className="home__subheading">Top Cryptocurrencies</h2>
                  <h4 className="show__more">
                    <Link to={"/currencies"}>Show More</Link>
                  </h4>
                </div>

                <div className="home__currencies">
                  <CoinCart coinsData={coins} />
                </div>
              </div>
              {/*  */}
              <br />
              <div className="top__ten__crypto">
                <div className="heading__section">
                  <h2 className="home__subheading">Latest Crypto News</h2>
                  <h4 className="show__more">
                    <Link to={"/news"}>Show More</Link>
                  </h4>
                </div>
                <div className="home__currencies">
                  <NewsCart newsData={news} />
                </div>
              </div>
              {/*  */}
            </>
          ) : (
            <>
              <Error errorName="Somethings Went's Wrong..!!" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Homepage;
