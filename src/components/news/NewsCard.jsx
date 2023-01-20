import React from "react";
import millify from "millify";
import "./NewsCard.css";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import newsDefault from "../../assets/images/newsDefault.jpg";

const NewsCart = ({ newsData }) => {
  return (
    <>
      {newsData &&
        newsData.map((news, i) => {
          return (
            <div className="news__cart" key={i}>
              <a href={news.url} target="_blank">
                <div className="news__cart__header" key={news.id + "1234"}>
                  <h6 className="news__cart__heading">{news.name}</h6>
                  <img
                    className="news__cart__image"
                    src={
                      news.image ? news.image.thumbnail.contentUrl : newsDefault
                    }
                    alt="news_icon"
                  />
                </div>
                <div className="news__cart__details" key={news.id + "123"}>
                  <p>{news.description.substring(0, 80)}...</p>
                  <p className="news__source">
                    <img
                      src={
                        news.image
                          ? news.image.thumbnail.contentUrl
                          : newsDefault
                      }
                      alt="news_icon"
                      className="news__source__image"
                    />
                    {news.provider[0].name ? (
                      <span>{news.provider[0].name}</span>
                    ) : (
                      ""
                    )}
                    <span>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </span>
                  </p>
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
};

export default NewsCart;
