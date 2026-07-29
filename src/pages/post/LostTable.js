// LostTable.jsx
import tableStyles from "../../styles/Table2.module.css";

export default function LostTable({ postDetail }) {
  return (
    <table className={tableStyles.Table2}>
      <tbody>
        <tr>
          <th>번호</th>
          <td>{postDetail.postId}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{postDetail.writer}</td>
        </tr>
        <tr>
          <th>작성 날짜</th>
          <td>2025.10.10.금</td>
        </tr>
        <tr>
          <th>물품 카테고리</th>
          <td>
            {Array.isArray(postDetail.categories) && postDetail.categories.map((cat, idx) => (
              <span key={idx}>
                {cat}{idx < postDetail.categories.length - 1 ? ' / ' : ''}
              </span>
            ))}
          </td>
        </tr>
        <tr>
          <th>상태</th>
          <td>
            {postDetail.status === "UNCOMPLETED" && "미완료"}
            {postDetail.status === "COMPLETED" && "완료"}
            {postDetail.status === "POLICE" && "인계"}
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{postDetail.title}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>{postDetail.content ? postDetail.content : "-"}</td>
        </tr>
      </tbody>
    </table>
  );
}
