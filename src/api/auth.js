import { MY } from "../assets/MY.js";
import { TokenStore } from "../TokenStore.js";
import api from "./api.js";
import axios from 'axios';


export const login = async (studentId, password, navigate) => {
    console.log("login start");
    console.log("studentId: " + studentId + " password: " + password);

    if (!studentId && !password){ alert("studentId와 password를 입력하세요."); return; }
    else {
        if (!studentId) { alert("studentId를 입력하세요."); return; }
        if (!password) { alert("password를 입력하세요."); return; }
    }

    try {
        const res = await axios.post('/api/auth/login', {
            studentId,
            password,
            isWeb: true
        });

        TokenStore.setToken(res.data.accessToken);
        
        console.log(res.data);
        await profile();
        
        console.log("로그인 성공");
        alert(MY.getMY().name + "님 로그인하였습니다.");

        navigate('/');
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("로그인 실패");
    }
};


// logout
export const logout = async (navigate) => {
    console.log("logout start");

    try {
        await api.post('/auth/logout');

        TokenStore.clearToken();
        MY.clearMY();

        alert("로그아웃하였습니다.");
        console.log("로그아웃 성공");

        navigate('/login');

    } catch (err) {
        console.error('에러 발생:', err);
        alert("로그아웃 실패");
    }
};


// 토큰을 통한 회원 정보 조회
export const profile = async () => {
    console.log("profile start");

    try {
        const res = await api.get('/auth/profile');
        
        console.log(res.data);
        MY.setMY(res.data);

        // alert("회원 정보 조회");
        console.log("회원 정보 조회: " + res.data);
        return res.data;

    } catch (err) {
        console.error('에러 발생:', err);
        // alert("회원 정보 조회 실패");
    }
};


// refresh
// export const refresh = async () => {
//     console.log("refresh start");

//     try {
//         const res = await axios.post("/api/auth/refresh", {}, { withCredentials: true });

        
//         await profile();

//         console.log(res.data);
//         MY.setMY(res.data);

//         TokenStore.setToken(res.data.accessToken);

//         alert("refresh 완료!!!!");
//         console.log("회원 정보 조회: " + res.data);

//         return res.data.accessToken;
//     } catch (err) {
//         console.error('에러 발생:', err);
//         alert("refresh 실패");

//         window.location.href = "/Login";
//     }

    
// };