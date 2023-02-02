import React, { useEffect, useState } from "react";
import "./News.css";
import { useDispatch, useSelector } from "react-redux";
import NewsCart from "../../components/news/NewsCard";
import { fetchCryptoNewsApi } from "../../services/cryptoNewsSlice";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const News = () => {
  const dispatch = useDispatch();
  const { status, news, error } = useSelector((state) => state.cryptoNews);
  useEffect(() => {
    dispatch(fetchCryptoNewsApi(100));
  }, []);
  if (status === "loading") return <Loader loadingName={`Loading News`} />;
  return (
    <div className="currencies__container">
      {status == "success" ? (
        <>
          <div className="currencies__wrapper">
            <div className="currencies__cart">
              <NewsCart newsData={news} />
            </div>
          </div>
        </>
      ) : (
        <Error errorName="Failed To Get News..!!" />
      )}
    </div>
  );
};

export default News;
