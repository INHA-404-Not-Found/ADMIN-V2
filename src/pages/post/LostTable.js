// LostTable.jsx
import tableStyles from "../../styles/Table2.module.css";
import { DateTimeFormat } from "../../utils/DateFormat";
import StatusBadge from "./StatusBadge";

export default function LostTable({ postDetail }) {
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
          <th>분실 장소</th>
          <td>
            {postDetail.locationName || "-"}
            {postDetail.locationDetail ? ` (${postDetail.locationDetail})` : ""}
          </td>
        </tr>
        <tr>
          <th>상태</th>
          <td>
            <StatusBadge status={postDetail.status} />
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
