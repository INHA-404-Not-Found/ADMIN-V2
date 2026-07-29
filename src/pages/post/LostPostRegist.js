import { useState } from "react";
import { registerPost } from "../../api/post";
import LostTableRegist from "./LostTableRegist";
import ImageSetRegist from "../../components/ImageSetRegist";

export default function LostPostRegist({ onClose }) {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
        <div style={{ fontWeight: "bold" }}>분실 게시물 등록</div>
        <img
          src="./images/close.png"
          alt="close"
          onClick={onClose}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
      </div>

      {/* Scrollable Content: 이미지 + 테이블 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "8px",
          marginBottom: "15px",
        }}
      >
        {/* 이미지 영역 */}
        <div style={{ marginBottom: "20px" }}>
          <ImageSetRegist images={images} setImages={setImages} />
        </div>

        {/* 테이블 영역 */}
        <LostTableRegist
          images={images}
          setImages={setImages}
          categories={categories}
          setCategories={setCategories}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            color: "#215294",
            border: "1px solid #215294",
            borderRadius: "8px",
            padding: "8px 40px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          취소하기
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
            registerPost(
              false, 0, categories,
              0, '', '',
              title, content, "LOST", images
            );
            onClose();
          }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
