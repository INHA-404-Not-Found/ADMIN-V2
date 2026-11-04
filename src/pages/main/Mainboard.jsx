import StatusSelect from "../../components/StatusSelect";
import styles from "../../styles/Mainboard.module.css";
import tableStyles from "../../styles/Table.module.css";
import pageStyles from "../../styles/Pagination.module.css";
import { useEffect, useState } from "react";
import {
  getAllPosts,
  getPost,
  getPostsByKeywordAndTags,
  getPostsByTags,
  modifyPosts,
  removePosts,
} from "../../api/post";
import { getPostsByKeyword } from "./../../api/post";
import { DateFormat } from "./../../utils/DateFormat";

export default function MainBoard({
  showPopUp,
  setShowPopUp,
  setType,
  setPostId,
  postList,
  setPostList,
}) {
  // 페이지 처리
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  // 일관 삭제, 상태 변경용
  const [postIdList, setPostIdList] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");

  const [tempList, setTempList] = useState([]);

  const fetchPostList = async () => {
    await getAllPosts(setPostList, 1);
  };

  // 게시글 일괄 삭제, 상태 변경을 위해 checkbox 처리
  const handleCheckboxChange = (postId, checked) => {
    if (checked) {
      setPostIdList((prev) => [...prev, postId]);
    } else {
      setPostIdList((prev) => prev.filter((id) => id !== postId));
    }
  };

  // 어디가 맨 끝 화면인지 모르기 때문에 -> 검색을 호출했을 때, postList가 null이면 그 전 페이지로 돌아간다.
  useEffect(() => {
    // postList가 없거나 빈 배열이면 이전 페이지로
    if (!postList || postList.length === 0) {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [postList]);

  useEffect(() => {
    setCurrentPage(1);
    console.log(currentPage, keyword, selectedStatus, selectedType);

    // 기본적으로 모든 경우에 getPostsByKeywordAndTags 호출
    getPostsByKeywordAndTags(
      setPostList,
      keyword,
      selectedStatus,
      selectedType,
      currentPage,
    );
  }, [selectedStatus, selectedType]);

  useEffect(() => {
    console.log(currentPage, keyword, selectedStatus, selectedType);

    // 기본적으로 모든 경우에 getPostsByKeywordAndTags 호출
    getPostsByKeywordAndTags(
      setPostList,
      keyword,
      selectedStatus,
      selectedType,
      currentPage,
    );
  }, [currentPage, keyword]);

  // 왼쪽 버튼 클릭 시
  const handlePrev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  // 오른쪽 버튼 클릭 시
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const nothingSelected = postIdList.length === 0;

  {
    /*메인보드*/
  }
  return (
    <div className={styles.Container}>
      <header>
        <h1 className={styles.Title_Container}>분실물 대장</h1>
        <p className={styles.Page_Desc}>
          습득·분실 게시글을 확인하고 처리합니다.
        </p>
      </header>

      {/*검색창*/}
      <div className={styles.Toolbar}>
        <div className={styles.Search_Input}>
          <input
            placeholder="게시글 번호 또는 제목으로 검색"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button
            type="submit"
            aria-label="검색"
            onClick={async () => {
              if (!isNaN(keyword)) {
                // 숫자 -> postId를 검색
                console.log("숫자" + Number(keyword));

                await getPost(setTempList, Number(keyword));
                console.log("tempList: " + tempList);
                setPostList([tempList]);
              } else {
                // 문자열 -> 게시글 제목 검색
                console.log("문자열" + keyword);
                await getPostsByKeywordAndTags(
                  setPostList,
                  keyword,
                  selectedStatus,
                  selectedType,
                  currentPage,
                );
              }
            }}
          >
            <img src="./images/search.png" alt="" width="18" height="18" />
          </button>
        </div>

        <div className={styles.Search_Option}>
          <select
            id="stateType"
            className={styles.State_Type_Select}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            <option id="stateType" value="ALL">
              전체
            </option>
            <option id="stateType" value="FIND">
              습득
            </option>
            <option id="stateType" value="LOST">
              분실
            </option>
          </select>

          <div className={styles.Segmented}>
            <label className={styles.Checkbox_Style}>
              <input
                type="radio"
                name="status"
                value="전체"
                checked={selectedStatus === ""}
                onChange={() => setSelectedStatus("")}
              />
              <span>전체</span>
            </label>
            <label className={styles.Checkbox_Style}>
              <input
                type="radio"
                name="status"
                value="미완료"
                checked={selectedStatus === "UNCOMPLETED"}
                onChange={() => setSelectedStatus("UNCOMPLETED")}
              />
              <span>미완료</span>
            </label>

            <label className={styles.Checkbox_Style}>
              <input
                type="radio"
                name="status"
                value="완료"
                checked={selectedStatus === "COMPLETED"}
                onChange={() => setSelectedStatus("COMPLETED")}
              />
              <span>완료</span>
            </label>

            <label className={styles.Checkbox_Style}>
              <input
                type="radio"
                name="status"
                value="인계됨"
                checked={selectedStatus === "POLICE"}
                onChange={() => setSelectedStatus("POLICE")}
              />
              <span>인계됨</span>
            </label>
          </div>
        </div>
      </div>

      {/*게시글 리스트*/}
      <div>
        {/*여러개 한 번에 삭제 상태 변경 버튼*/}
        <div className={styles.Select_Option}>
          <span className={styles.Bulk_Count}>
            선택한 게시글 <strong>{postIdList.length}</strong>건
          </span>

          <button
            className={styles.Delete_Button}
            disabled={nothingSelected}
            onClick={async () => {
              if (window.confirm("삭제하면 복구할 수 없습니다.")) {
                await removePosts(postIdList);
                await fetchPostList();
                setPostIdList([]);
                alert(postIdList.length + "개를 삭제하였습니다.");
              } else {
                alert("취소하였습니다.");
              }
            }}
          >
            선택 삭제
          </button>
          <button
            disabled={nothingSelected}
            onClick={async () => {
              if (window.confirm("경찰서에 인계를 완료하였습니까?")) {
                await modifyPosts(postIdList, "POLICE");
                await fetchPostList();
                setPostIdList([]);
                alert(postIdList.length + "개의 상태를 인계로 변경하였습니다.");
              } else {
                alert("취소하였습니다.");
              }
            }}
          >
            경찰 인계 처리
          </button>
        </div>

        {/*테이블*/}
        <div className={styles.Table_Card}>
          <table className={tableStyles.Table}>
            <thead>
              <tr>
                <th></th>
                <th>번호</th>
                <th>날짜</th>
                <th>습득/분실</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(postList) &&
                postList.map((e) => (
                  <tr key={e.postId} data-status={e.status} data-type={e.type}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        aria-label={`${e.title} 선택`}
                        checked={postIdList.includes(e.postId)}
                        onChange={(event) =>
                          handleCheckboxChange(e.postId, event.target.checked)
                        }
                      />
                    </td>
                    <td>#{e.postId}</td>
                    <td>{DateFormat(e.createdAt)}</td>
                    <td>{e.type == "FIND" ? "습득" : "분실"}</td>
                    <td
                      onClick={() => {
                        setShowPopUp(true);
                        if (e.type === "FIND") {
                          setType("gain post");
                        } else if (e.type === "LOST") {
                          setType("lost post");
                        }
                        setPostId(e.postId);
                      }}
                    >
                      {e.title}
                    </td>
                    <td>
                      {Array.isArray(e.categories) &&
                        e.categories.map((cat, idx) => (
                          <span key={idx}>
                            {cat}
                            {idx < e.categories.length - 1 ? " / " : ""}
                          </span>
                        ))}
                    </td>
                    <td>{e.writer}</td>
                    <td>
                      <StatusSelect
                        showPopUp={showPopUp}
                        setShowPopUp={setShowPopUp}
                        setType={setType}
                        type={e.type}
                        status={e.status}
                        postId={e.postId}
                        setPostId={setPostId}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={pageStyles.Pagination}>
        <button
          type="button"
          className={pageStyles.Arrow}
          onClick={handlePrev}
          aria-label="이전 페이지"
        >
          <img src="./images/left.png" alt="" />
        </button>

        <div className={pageStyles.PaginationNum}>
          <button className={pageStyles.SelectedPage}>{currentPage}</button>
        </div>

        <button
          type="button"
          className={pageStyles.Arrow}
          onClick={handleNext}
          aria-label="다음 페이지"
        >
          <img src="./images/right.png" alt="" />
        </button>
      </div>

      <footer className={styles.FooterContainer}>
        <div>© 2025 404-Not-Found. All rights reserved.</div>
        <div>jiyun421 | eheka78 | Kdoby | yuminmi</div>
      </footer>
    </div>
  );
}
