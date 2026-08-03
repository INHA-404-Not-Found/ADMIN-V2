// GainTable.jsx
import tableStyles from "../../styles/Table2.module.css";
import { DateTimeFormat } from "../../utils/DateFormat";
import StatusBadge from "./StatusBadge";

export default function GainTable({ postDetail, receiver }) {
  const categories = Array.isArray(postDetail.categories)
    ? postDetail.categories
    : [];

  return (
    <table className={tableStyles.Table2}>
      <tbody>
        <tr>
          <th>번호</th>
          <td>#{postDetail.postId}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{postDetail.writer}</td>
        </tr>
        <tr>
          <th>작성 날짜</th>
          <td>{DateTimeFormat(postDetail.createdAt) || "-"}</td>
        </tr>
        <tr>
          <th>물품 카테고리</th>
          <td>
            {categories.length > 0 ? (
              <div className={tableStyles.Chips}>
                {categories.map((cat, idx) => (
                  <span key={idx} className={tableStyles.Chip}>
                    {cat}
                  </span>
                ))}
              </div>
            ) : (
              "-"
            )}
          </td>
        </tr>
        <tr>
          <th>습득 장소</th>
          <td>
            {postDetail.locationName || "-"}
            {postDetail.locationDetail ? ` (${postDetail.locationDetail})` : ""}
          </td>
        </tr>
        <tr>
          <th>보관 위치</th>
          <td>{postDetail.storedLocation || "-"}</td>
        </tr>
        <tr>
          <th>상태</th>
          <td>
            <StatusBadge status={postDetail.status} />
          </td>
        </tr>
        <tr>
          <th>수령인</th>
          <td>
            {receiver.name ? (
              <div className={tableStyles.Stack}>
                <div>
                  <span className={tableStyles.StackLabel}>이름</span>
                  {receiver.name}
                </div>
                <div>
                  <span className={tableStyles.StackLabel}>학번</span>
                  {receiver.studentId || "-"}
                </div>
                <div>
                  <span className={tableStyles.StackLabel}>이메일</span>
                  {receiver.email}
                </div>
                <div>
                  <span className={tableStyles.StackLabel}>전화</span>
                  {receiver.phoneNumber}
                </div>
              </div>
            ) : (
              "-"
            )}
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{postDetail.title}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td className={tableStyles.Content}>{postDetail.content || "-"}</td>
        </tr>
      </tbody>
    </table>
  );
}
