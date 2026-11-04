import Mainboard from "./Mainboard";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
import styles from "../../styles/Main.module.css";

import { useState } from "react";
import PopUpFrame from "../../components/PopUpFrame";
import { getAllPosts, modifyPosts } from "../../api/post";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [type, setType] = useState("");
  const [postId, setPostId] = useState(0);

  const fetchPostList = async () => {
    await getAllPosts(setPostList, 1);
  };

  // 수령인 등록 화면 저장
  const handleSave = async () => {
    await modifyPosts(Array.isArray(postId) ? postId : [postId], "COMPLETED");

    setShowPopUp(false);
  };

  return (
    <div className={styles.Layout}>
      {/*왼쪽 메뉴*/}
      <aside className={styles.Sidebar}>
        <div className={styles.SidebarInner}>
          {/*로고*/}
          <Logo />

          {/*메뉴*/}
          <Menu setShowPopUp={setShowPopUp} setType={setType} />
        </div>
      </aside>

      {/*메인보드*/}
      <div className={styles.Content}>
        <Mainboard
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setType={setType}
          setPostId={setPostId}
          postList={postList}
          setPostList={setPostList}
        />
      </div>

      {showPopUp && (
        <PopUpFrame
          type={type}
          setType={setType}
          postId={postId}
          onClose={async () => setShowPopUp(false)}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
