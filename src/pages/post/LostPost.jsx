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
        padding: "12px 0 0",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
          paddingBottom: "8px",
          marginBottom: "15px",
        }}
      >
        <div style={{ fontFamily: "var(--font-semibold)", fontSize: "16px" }}>
          분실 게시물
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          style={{
            display: "flex",
            padding: "4px",
            border: "none",
            borderRadius: "var(--radius-sm)",
            background: "none",
            cursor: "pointer",
          }}
        >
          <img
            src="./images/close.png"
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
        </button>
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
          className="btn btnPrimary"
          onClick={() => {
            setType("lost post edit");
          }}
        >
          수정하기
        </button>

        <button
          className="btn btnDanger"
          onClick={() => {
            if (window.confirm("삭제하시겠습니까?")) {
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
