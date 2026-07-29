import { useEffect, useState } from "react";
import { logout, profile } from "../api/auth";
import styles from "../styles/Main.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { MY } from "../assets/MY";

export default function Menu({setShowPopUp, setType}) {
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

    return (
        <div className={styles.Menu_Container}>
            <img src="./images/user.png" alt="user" />
            { userInfo ? 
                <div>
                    <span style={{ fontFamily: "Pretendard-ExtraBold" }}>{userInfo.studentId} {userInfo.name}</span> ({userInfo.role})
                </div>
                : <div>Loading......</div>
            }

            <img src="./images/logout.png" alt="logout" />
            <div
                onClick={() => { logout(navigate); }}
                style={{ cursor: "pointer" }}    
            >
                로그아웃
            </div>

            <img src="./images/dashboard.png" alt="dashboard" />
            <div>
                <Link
                    to="/"
                    style={{
                        color: location.pathname === "/" ? "#215294" : "black",
                        fontWeight: location.pathname === "/" ? "bold" : "normal",
                    }}
                >
                    Dashboard
                </Link>
            </div>

            <img src="./images/item.png" alt="item" />
            <div>
                <Link
                    to="/itemCategory"
                    style={{
                        color: location.pathname === "/itemCategory" ? "#215294" : "black",
                        fontWeight: location.pathname === "/itemCategory" ? "bold" : "normal",
                    }}
                >
                    물품 카테고리 관리
                </Link>
            </div>

            <div></div><div></div>

            <img src="./images/add.png" alt="add" />
            <div
                onClick={() => { setShowPopUp(true); setType("regist lost post");}}
                style={{ cursor: "pointer" }}    
            >분실 게시글 작성</div>

            <img src="./images/add.png" alt="add" />
            <div
                onClick={() => { setShowPopUp(true); setType("regist gain post");}}
                style={{ cursor: "pointer" }}    
            >습득 게시글 작성</div>
        </div>
    )
}