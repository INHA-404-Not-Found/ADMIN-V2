import { useState } from "react";
import ItemCategory from "./ItemCategory";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
import PopUpFrame from "../../components/PopUpFrame";
import styles from "../../styles/Main.module.css";

export default function ItemCategoryPage() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [type, setType] = useState("");

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
        <ItemCategory />
      </div>

      {showPopUp && (
        <PopUpFrame
          type={type}
          setType={setType}
          onClose={() => setShowPopUp(false)}
        />
      )}
    </div>
  );
}
