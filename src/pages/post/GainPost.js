// GainPost.jsx
import { useEffect, useState } from "react";
import ImageSet from "../../components/ImageSet";
import GainTable from "./GainTable";
import { getPost, removePost } from "../../api/post";
import { getReceiverByPost } from "../../api/receiver";

export default function GainPost({ onClose, setType, postId }) {
  const [postDetail, setPostDetail] = useState({});
  const [receiver, setReceiver] = useState({});

  // 게시글 불러오기
  useEffect(() => {
    getPost(setPostDetail, postId);
  }, [postId]);

  // 수령인 불러오기 (완료 상태일 때만)
  useEffect(() => {
    if (postDetail.status !== "COMPLETED") return;
    getReceiverByPost(setReceiver, postId);
  }, [postDetail, postId]);

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
          습득 게시물
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

      {/* Scrollable Content: 이미지 + 테이블 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        {/* 이미지 영역 */}
        {postDetail.imagePath?.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <ImageSet images={postDetail.imagePath} />
          </div>
        )}

        {/* 테이블 영역 */}
        <GainTable postDetail={postDetail} receiver={receiver} />
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
        {postDetail.status !== "COMPLETED" && (
          <button
            className="btn btnPrimary"
            onClick={() => setType("regist receiver")}
          >
            완료 표시하기
          </button>
        )}

        <button
          className="btn btnGhost"
          onClick={() => setType("gain post edit")}
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
