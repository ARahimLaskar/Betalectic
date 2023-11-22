import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const ConfirmDeleteModal = ({ onDelete }) => {
  const Modal = (props, ref) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "4rem",
          fontSize: "2.4rem",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        }}
        ref={ref}
        className="relative bg-white text-black px-2 py-8 rounded border-2 flex flex-col items-center gap-y-5 w-[400px]"
      >
        <div
          className="text-gray-500 bg-transparent absolute top-2 right-2 p-0 cursor-pointer"
          onClick={() => {
            props.onAction(true);
          }}
        ></div>
        <label>Are you sure you want to delete !</label>
        <div className="w-full flex justify-evenly">
          <ReuseButton
            className="text-2xl rounded bg-red-400 px-3 py-1 w-fit"
            onClick={() => {
              props.onAction(false);
            }}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            className=" text-2xl rounded bg-green-400 px-3 py-1 w-fit"
            onClick={() => {
              props.onAction(true);
            }}
          >
            Confirm
          </ReuseButton>
        </div>
      </div>
    );
  };

  const showModal = async () => {
    const result = await HeadlessModal({
      component: Modal,
      // backdropClasses: "bg-gray-200",
    });
    if (result) {
      onDelete();
    }
  };

  return (
    <div>
      <span
        onClick={showModal}
        class="material-symbols-outlined"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        delete
      </span>
    </div>
  );
};

export default ConfirmDeleteModal;
