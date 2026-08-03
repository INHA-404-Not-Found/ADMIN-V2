import styles from "../../styles/Login.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className={styles.Page}>
      {/* 브랜드 면 */}
      <div className={styles.Brand}>
        <div className={styles.Brand_Eyebrow}>LOST INHA · ADMIN</div>

        <div className={styles.Brand_Badge}>
          <img src="./images/INHA_logo.png" alt="인하대학교" />
        </div>

        <div className={styles.Brand_Title}>분실물 찾기</div>
        <div className={styles.Brand_Sub}>관리자 페이지</div>

        <div className={styles.Brand_Foot}>
          교내에서 접수된 습득물과 분실 신고를 한곳에서 확인하고,
          <br />
          수령인 등록과 경찰 인계까지 처리합니다.
        </div>
      </div>

      {/* 로그인 */}
      <div className={styles.FormSide}>
        <div className={styles.Form}>
          <h1 className={styles.Form_Title}>로그인</h1>
          <p className={styles.Form_Desc}>관리자 계정으로 로그인하세요.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(studentId, pwd, navigate);
            }}
          >
            {/* 학번 입력 */}
            <div className={styles.Input_Label_Container}>
              <label className={styles.Label} htmlFor="studentId">
                학번
              </label>
              <input
                id="studentId"
                type="text"
                className={`${styles.Input_txt} ${styles.Input_Id}`}
                placeholder="12201234"
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className={styles.Input_Label_Container}>
              <label className={styles.Label} htmlFor="password">
                비밀번호
              </label>
              <div className={styles.Password_Container}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.Input_txt}
                  placeholder="비밀번호"
                  onChange={(e) => setPwd(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.ShowBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "숨기기" : "보기"}
                </button>
              </div>
            </div>

            <input type="submit" className={styles.Btn} value="로그인" />
          </form>
        </div>
      </div>
    </div>
  );
}
