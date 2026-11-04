import { useEffect, useState } from "react";
import ImageSetEdit from "../../components/ImageSetEdit";
import GainTableEdit from "./GainTableEdit";
import { getPost, modifyPost, removePost } from "../../api/post";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";

export default function GainPostEdit({ onClose, setType, postId }) {
  const [categoryList, setCategoryList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [editImagesList, setEditImageList] = useState([]);
  const [postDetail, setPostDetail] = useState([]);
  
  const [changeImage, setChangeImage] = useState(false);

  useEffect(() => {
    getAllCategories(setCategoryList);
    getAllLocations(setLocationList);
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

    const selectedLocation = locationList.find(
      loc => loc.name === postDetail.locationName
    );

    const updatedPost = {
      ...postDetail,
      categories: categoryIds,
      locationId: selectedLocation?.id || null,
    };

    delete updatedPost.locationName;
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
        <div style={{ fontFamily: "var(--font-semibold)", fontSize: "16px" }}>습득 게시물 수정</div>
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
          <ImageSetEdit images={editImagesList} setImages={setEditImageList} setChangeImage={setChangeImage} />
        </div>

        {/* 테이블 영역 */}
        <GainTableEdit
          postDetail={postDetail}
          setPostDetail={setPostDetail}
          categoryList={categoryList}
          locationList={locationList}
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
          className="btn btnGhost"
          onClick={() => setType("gain post")}
        >
          취소하기
        </button>

        <button
          className="btn btnPrimary"
          onClick={() => {
            handleSave();
            onClose();
          }}
        >
          수정 저장하기
        </button>

        <button
          className="btn btnDanger"
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
