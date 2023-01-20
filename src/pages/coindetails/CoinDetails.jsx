import React, { useEffect, useState } from "react";
import "./CoinDetails.css";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useParams } from "react-router-dom";
import { fetchCryptoDetails } from "../../services/cryptoDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { TbMilitaryRank } from "react-icons/tb";
import { HiArrowCircleUp } from "react-icons/hi";
import { GiCrownCoin } from "react-icons/gi";
import { RiExchangeFill, RiCoinsFill } from "react-icons/ri";
import {
  MdVerifiedUser,
  MdVerified,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { GiTwoCoins } from "react-icons/gi";
import { SiScrimba } from "react-icons/si";
import LineChart from "../../components/linechart/LineChart";
import { fetchCryptoHistory } from "../../services/cryptoHistorySlice";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const CoinDetails = () => {
  const dispatch = useDispatch();
  const { status, cryptoDetails } = useSelector((state) => state.cryptoDetails);
  const { status: coinHistoryStatus, coinHistory } = useSelector(
    (state) => state.cryptoCoinHistory
  );
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  useEffect(() => {
    dispatch(fetchCryptoDetails(coinId));
    dispatch(fetchCryptoHistory(coinId, timePeriod));
  }, [timePeriod]);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <RiCoinsFill />,
    },
    {
      title: "Rank",
      value: "#" + cryptoDetails?.rank,
      icon: <TbMilitaryRank />,
    },

    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <GiTwoCoins />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <HiArrowCircleUp />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <GiCrownCoin />,
    },
    {
      title: "Num Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <RiExchangeFill />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <MdVerifiedUser />
      ) : (
        <VscError />
      ),
      icon: <MdVerified />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <GiTwoCoins />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <SiScrimba />,
    },
  ];
  if (status === "loading" || coinHistoryStatus === "loading")
    return <Loader loadingName={`Loading Info`} />;

  return (
    <>
      {status === "success" && coinHistoryStatus === "success" ? (
        <div className="coinDetails__container">
          <div className="coinDetails__wrapper">
            <div className="coinDetails__header__section">
              <h4 className="coinDetails__header">
                {`${cryptoDetails.name} Price`}
              </h4>
              <p>
                {cryptoDetails.name} live price in US Dollars.view value
                statistics,market cap and supply
              </p>
            </div>

            <br />
            <div className="coinDetails__select__days">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                {time.map((date, i) => {
                  return (
                    <option value={date} key={i}>
                      {date}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* line chart */}
            <div className="coin__lineChart">
              <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
              />
            </div>
            {/*  */}
            <div className="stats__container">
              <div className="overview__stat">
                <h4 className="coin__value__stat__heading">
                  An Overview showing the stats of {cryptoDetails.name}
                </h4>
                <br />
                {stats.map(({ icon, title, value }, i) => {
                  return (
                    <div className="coin__stats" key={i}>
                      <div className="coin__stats__details">
                        <i className="coin__stat__icon">{icon}</i>
                        <h6 className="coin__stats__name">{title}</h6>
                      </div>
                      <h6>{value}</h6>
                    </div>
                  );
                })}
              </div>
              <div className="other__stat">
                <h4 className="coin__value__stat__heading">Other Statistics</h4>
                <br />
                {genericStats.map(({ icon, title, value }, i) => {
                  return (
                    <div className="coin__stats" key={i}>
                      <div className="coin__stats__details">
                        <i className="coin__stat__icon">{icon}</i>
                        <h6 className="coin__stats__name">{title}</h6>
                      </div>
                      <h6>{value}</h6>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  */}
          </div>
          <div className="coin__desc__link">
            <h3>What is {cryptoDetails.name} ?</h3>
            {HTMLReactParser(cryptoDetails.description)}
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default CoinDetails;
