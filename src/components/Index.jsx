import React, { useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FavoriteList } from "./FavoriteList";
import { MyButton } from "./MyButton";

export const Index = () => {
  const navigate = useNavigate();
  const handleAddFav = () => {
    navigate("/add-fav");
  };

  let storeIsValid = false;
  let storedFormData = localStorage.getItem("formData");
  if (
    storedFormData === null ||
    storedFormData === undefined ||
    storedFormData === "[]"
  ) {
    storeIsValid = false;
  } else {
    storeIsValid = true;
  }

  return (
    <div className="index_container">
      <div className="flex justify-between items-center pb-40">
        <p id="heading" className="text-5xl font-normal">
          Welcome to favorite NPM Package
        </p>
        {storeIsValid ? (
          <MyButton onClick={handleAddFav} value="Add Fav" />
        ) : (
          ""
        )}
      </div>

      {storeIsValid ? (
        <FavoriteList />
      ) : (
        <div
          id="button-container"
          className="border-3 border-black w-full h-full text-center border-solid"
        >
          <p className="text-3xl font-light pb-20">
            You don't have any favs yet. Please add.
          </p>
          <MyButton onClick={handleAddFav} value="Add Fav" />
        </div>
      )}
    </div>
  );
};
