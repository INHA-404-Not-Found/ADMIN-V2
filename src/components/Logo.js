import styles from "../styles/Main.module.css";

import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to='/'>
            <div className={styles.Logo_Container}>
                <img
                    src="./images/INHA_logo.png"
                    style={{ height:"50px" }}
                />

                <div>
                    <div style={{ fontFamily: "Pretendard-SemiBold", fontSize:"20px" }}>
                        분실물 찾기
                    </div>
                    <div style={{ fontFamily: "Pretendard-Medium", fontSize:"13px" }}>관리자 페이지</div>
                </div>
            </div>
        </Link>
    )
}