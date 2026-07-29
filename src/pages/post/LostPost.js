// LostPost.jsx
import { useEffect, useState } from "react";
import ImageSet from "../../components/ImageSet";
import LostTable from "./LostTable";
import { getPost, removePost } from "../../api/post";

export default function LostPost({ onClose, setType, postId }) {
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    getPost(setPostDetail, postId);
  }, [postId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        borderRadius: "8px",
        padding: "15px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "8px",
          marginBottom: "15px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>분실 게시물</div>
        <img
          src="./images/close.png"
          alt="close"
          onClick={onClose}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        {/* 이미지 영역 */}
        {postDetail.imagePath && postDetail.imagePath.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <ImageSet images={postDetail.imagePath} />
          </div>
        )}

        {/* 게시글 내용 */}
        <LostTable postDetail={postDetail} />
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          style={{
            backgroundColor: "#215294",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 40px",
            cursor: "pointer",
          }}
          onClick={() => {
            setType("lost post edit");
          }}
        >
          수정하기
        </button>

        <button
          style={{
            backgroundColor: "#215294",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 40px",
            cursor: "pointer",
          }}
          onClick={() => {
            if(window.confirm("삭제하시겠습니까?")){
              alert("성공!");
              removePost(postId);
              onClose();
            }
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
