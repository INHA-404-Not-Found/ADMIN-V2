import GainTable from "./ReceiverRegistTable.js";
import ImageSet from "../../components/ImageSet.js";
import ReceiverRegistTable from "./ReceiverRegistTable.js";
import { useState } from "react";
import { registerReceiver } from "../../api/receiver.js";

export default function ReceiverRegist({ onClose, handleSave, postId }) {
  const [receiver, setReceiver] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  console.log(postId);

  return (
    <div>
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
          수령인 등록
        </div>

        <div>
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
      </div>

      <div
        style={{
          margin: "0 0 16px",
          padding: "10px 12px",
          borderLeft: "3px solid var(--blue-600)",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--blue-050)",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--text-2)",
          textAlign: "left",
        }}
      >
        수령인 정보를 등록하면 게시물이 <strong>완료</strong> 상태로 바뀝니다.
      </div>

      {/* 게시글 내용 */}
      <div style={{ marginBottom: "20px" }}>
        <ReceiverRegistTable
          postId={postId}
          setReceiver={setReceiver}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          setStudentId={setStudentId}
        />
      </div>

      {/* 수정 버튼 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button className="btn btnGhost" onClick={onClose}>
          취소하기
        </button>

        <button
          className="btn btnPrimary"
          onClick={() => {
            registerReceiver(postId, receiver, email, phoneNumber, studentId);
            handleSave();
          }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
