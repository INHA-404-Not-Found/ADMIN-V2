import GainPost from "../pages/post/GainPost";
import GainPostEdit from "../pages/post/GainPostEdit";
import LostPost from "../pages/post/LostPost";

import React from "react";
import LostPostEdit from "../pages/post/LostPostEdit";
import GainPostRegist from "../pages/post/GainPostRegist";
import LostPostRegist from "../pages/post/LostPostRegist";
import ReceiverRegist from "../pages/receiverRegist/ReceiverRegist";

export default function PopUpFrame({
  type,
  setType,
  postId,
  onClose,
  handleSave,
}) {
  console.log("팝업 open: ", type);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(14, 31, 53, 0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          borderRadius: "14px",
          width: "min(760px, 92vw)",
          maxHeight: "90vh",
          padding: "8px 20px 20px",
          boxShadow: "var(--shadow-pop)",
          position: "relative",
        }}
      >
        {type === "regist gain post" ? (
          <GainPostRegist onClose={onClose} />
        ) : (
          <></>
        )}
        {type === "regist lost post" ? (
          <LostPostRegist onClose={onClose} />
        ) : (
          <></>
        )}
        {type === "gain post" ? (
          <GainPost onClose={onClose} setType={setType} postId={postId} />
        ) : (
          <></>
        )}
        {type === "lost post" ? (
          <LostPost onClose={onClose} setType={setType} postId={postId} />
        ) : (
          <></>
        )}
        {type === "gain post edit" ? (
          <GainPostEdit onClose={onClose} setType={setType} postId={postId} />
        ) : (
          <></>
        )}
        {type === "lost post edit" ? (
          <LostPostEdit onClose={onClose} setType={setType} postId={postId} />
        ) : (
          <></>
        )}
        {type === "regist receiver" ? (
          <ReceiverRegist
            onClose={onClose}
            postId={postId}
            handleSave={handleSave}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
