import styles from "../../styles/Login.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <div className={styles.CenterAlignDiv}>
            <div className={styles.Part}>
                {/* 로고 */}
                <div className={styles.Logo_Container} style={{ marginBottom: "50px" }}>
                    <img src="./images/INHA_logo.png" style={{ height: "110px" }} alt="logo" />
                    <div style={{ margin: "auto 0" }}>
                        <div style={{ fontFamily: 'Pretendard-Bold', fontSize: "40px" }}>
                            분실물 찾기
                        </div>
                        <div style={{ fontFamily: 'Pretendard-SemiBold', fontSize: "25px" }}>
                            관리자 페이지
                        </div>
                    </div>
                </div>

                {/* 로그인 */}
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login(studentId, pwd, navigate);
                        }}
                    >
                        <div style={{ marginBottom: "40px" }}>
                            {/* 학번 입력 */}
                            <div className={styles.Input_Label_Container}>
                                <div style={{ margin: "5px 0" }}>학번</div>
                                <input
                                    type="text"
                                    className={styles.Input_txt}
                                    placeholder="value"
                                    onChange={(e) => setStudentId(e.target.value)}
                                />
                            </div>

                            {/* 비밀번호 입력 */}
                            <div className={styles.Input_Label_Container}>
                                <div style={{ margin: "5px 0" }}>비밀번호</div>
                                <div className={styles.Password_Container}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={styles.Input_txt}
                                        placeholder="value"
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
                        </div>

                        <div>
                            <input
                                type="submit"
                                className={styles.Btn}
                                value="Sign In"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
