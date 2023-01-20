import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/homepage/Homepage";
import Currencies from "./pages/currencies/Currencies";
import CoinDetails from "./pages/coindetails/CoinDetails";
import News from "./pages/news/News";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/PageNotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/crypto/:coinId" element={<CoinDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
