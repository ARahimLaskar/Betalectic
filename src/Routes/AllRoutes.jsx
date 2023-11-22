import React from "react";
import { Route, Routes } from "react-router-dom";
import { Index } from "../components/Index";
import { AddFavorite } from "../components/AddFavorite";
import { FavoriteList } from "../components/FavoriteList";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/add-fav" element={<AddFavorite />} />
      <Route path="/fav-list" element={<FavoriteList />} />
    </Routes>
  );
};
