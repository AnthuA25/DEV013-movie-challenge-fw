import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { MovieDetail } from "./components/MovieDetail.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie/:id" element={<MovieDetail/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
