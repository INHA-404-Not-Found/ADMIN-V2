import styles from "../styles/Main.module.css";

import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className={styles.Logo_Container}>
        <div className={styles.Logo_Badge}>
          <img src="./images/INHA_logo.png" alt="인하대학교" />
        </div>

        <div>
          <div className={styles.Logo_Title}>분실물 찾기</div>
          <div className={styles.Logo_Sub}>관리자 페이지</div>
        </div>
      </div>
    </Link>
  );
}
