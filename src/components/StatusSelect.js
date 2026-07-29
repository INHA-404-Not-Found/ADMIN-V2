import { useEffect, useState } from "react";
import { modifyPosts } from './../api/post';

export default function StatusSelect({ showPopUp, setShowPopUp, setType, status, type, postId, setPostId }) {
    const [statusType, setStatusType] = useState("미완료");
    const [tempStatus, setTempStatus] = useState(statusType);       

    useEffect(() => {
        if (status === "UNCOMPLETED") setStatusType("미완료");
        else if (status === "COMPLETED") setStatusType("완료");
        else if (status === "POLICE") setStatusType("인계됨");
    }, [status]);

    const handleChange = (e) => {
        const value = e.target.value;

        if (showPopUp) return;

        if (value === "완료" && type === "FIND") {
            if (tempStatus !== "완료") {
                setTempStatus(value);

                // 클릭한 게시글 ID를 MainBoard 상태로 올림
                setPostId(postId);

                // 팝업 타입 설정
                setType("regist receiver");

                // 팝업 열기
                setShowPopUp(true);

                // 정상 처리
                setStatusType("완료");
            }
        } else {
            const statusCode =
                value === "완료" ? "COMPLETED" :
                value === "미완료" ? "UNCOMPLETED" :
                "POLICE";

            setStatusType(value);
            modifyPosts([postId], statusCode);
        }
    };

    return (
        <select
            style={{ padding: "2px 7px", borderRadius: "5px" }}
            value={statusType}
            onChange={handleChange}
        >
            <option value="미완료">미완료</option>
            <option value="완료">완료</option>
            <option value="인계됨">인계됨</option>
        </select>
    );
}
