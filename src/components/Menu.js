import { useEffect, useState } from "react";
import { logout, profile } from "../api/auth";
import styles from "../styles/Main.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { MY } from "../assets/MY";

export default function Menu({ setShowPopUp, setType }) {
  const [userInfo, setUserInfo] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profile();
        setUserInfo(res);
      } catch (e) {
        console.error("프로필 조회 실패", e);
      }
    };

    fetchProfile();
  }, []);

  const navItemClass = (path) =>
    location.pathname === path
      ? `${styles.NavItem} ${styles.NavItemActive}`
      : styles.NavItem;

  return (
    <nav className={styles.Menu_Container}>
      <div className={styles.Profile}>
        <img src="./images/user.png" alt="" />
        {userInfo ? (
          <div>
            <div className={styles.ProfileName}>{userInfo.name}</div>
            <div className={styles.ProfileMeta}>
              <span className={styles.ProfileId}>{userInfo.studentId}</span> ·{" "}
              {userInfo.role}
            </div>
          </div>
        ) : (
          <div className={styles.ProfileMeta}>프로필 불러오는 중</div>
        )}
      </div>

      <div className={styles.NavGroup}>
        <div className={styles.NavLabel}>관리</div>

        <Link to="/" className={navItemClass("/")}>
          <img src="./images/dashboard.png" alt="" />
          분실물 대장
        </Link>

        <Link to="/itemCategory" className={navItemClass("/itemCategory")}>
          <img src="./images/item.png" alt="" />
          물품 카테고리
        </Link>
      </div>

      <div className={styles.NavGroup}>
        <div className={styles.NavLabel}>게시글 작성</div>

        <button
          type="button"
          className={styles.NavItem}
          onClick={() => {
            setShowPopUp(true);
            setType("regist lost post");
          }}
        >
          <img src="./images/add.png" alt="" />
          분실 게시글 작성
        </button>

        <button
          type="button"
          className={styles.NavItem}
          onClick={() => {
            setShowPopUp(true);
            setType("regist gain post");
          }}
        >
          <img src="./images/add.png" alt="" />
          습득 게시글 작성
        </button>
      </div>

      <button
        type="button"
        className={styles.Logout}
        onClick={() => {
          logout(navigate);
        }}
      >
        <img src="./images/logout.png" alt="" />
        로그아웃
      </button>
    </nav>
  );
}
