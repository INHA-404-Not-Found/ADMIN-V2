import { useEffect, useState } from "react";
import LostTableEdit from "./LostTableEdit";
import ImageSetEdit from "../../components/ImageSetEdit";
import { getPost, modifyPost, removePost } from "../../api/post";
import { getAllCategories } from "../../api/category";

export default function LostPostEdit({ onClose, setType, postId }) {
  const [categoryList, setCategoryList] = useState([]);
  const [editImagesList, setEditImageList] = useState([]);
  const [postDetail, setPostDetail] = useState([]);

  const [changeImage, setChangeImage] = useState(false);

  useEffect(() => {
    getAllCategories(setCategoryList);
  }, []);

  useEffect(() => {
    getPost(setPostDetail, postId);
  }, [postId]);

  useEffect(() => {
    setEditImageList(postDetail.imagePath || []);
  }, [postDetail]);

  const handleSave = async () => {
    const categoryIds = categoryList
      .filter(c => postDetail.categories.includes(c.name))
      .map(c => c.id);

    const updatedPost = {
      ...postDetail,
      categories: categoryIds,
    };

    delete updatedPost.imagePath;

    console.log("보낼 데이터:", updatedPost);

    await modifyPost(postId, updatedPost, editImagesList, changeImage);
  };

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
        <div style={{ fontWeight: "bold" }}>분실 게시물 수정</div>
        <img
          src="./images/close.png"
          alt="close"
          onClick={onClose}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
      </div>

      {/* Scrollable content */}
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
          {postDetail && <ImageSetEdit images={editImagesList} setImages={setEditImageList} setChangeImage={setChangeImage} />}
        </div>

        {/* 테이블 영역 */}
        <LostTableEdit
          postDetail={postDetail}
          setPostDetail={setPostDetail}
          categoryList={categoryList}
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
          onClick={() => setType("lost post")}
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
            handleSave();
            onClose();
          }}
        >
          수정 저장하기
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
