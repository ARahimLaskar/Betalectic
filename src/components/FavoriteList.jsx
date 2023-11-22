import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

export const FavoriteList = () => {
  const [list, setList] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return storedData || [];
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (list.length == 0) {
      navigate("/");
    }
  }, [list]);

  const deleteItem = (itemToDelete) => {
    const updatedList = [...list];
    updatedList.splice(itemToDelete, 1);
    setList(updatedList);
    localStorage.setItem("formData", JSON.stringify(updatedList));
  };

  return (
    <div className="favList-container">
      <div className="favList-heading">
        <p>Package Name</p>
        <p>Actions</p>
      </div>
      <div className="favList-items">
        <ul>
          {list?.map((e, i) => {
            return (
              <li key={i} className="favList-item">
                <p>{e.package}</p>
                <div className="favList-item-action">
                  <span class="material-symbols-outlined">visibility</span>
                  <span class="material-symbols-outlined">edit_square</span>
                  <ConfirmDeleteModal
                    onDelete={() => deleteItem(i)}
                    index={i}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
