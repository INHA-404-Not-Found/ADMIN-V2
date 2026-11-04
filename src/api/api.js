import axios from "axios";
import { TokenStore } from './../TokenStore';
import { profile } from "./auth";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true // 기본값: 쿠키 전송 허용
});

// 새로고침 시 refresh 실행
(async () => {
  try {
    const refreshRes = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
    
    
    const newAccessToken = refreshRes.data.data.accessToken;
    TokenStore.setToken(newAccessToken);

    profile();
    
    console.log("🔄 새로고침 시 토큰 갱신 성공");
  } catch (e) {
    console.warn("🔄 새로고침 시 토큰 갱신 실패", e);
    TokenStore.clearToken();
  }
})();

// 요청 시 Access Token 붙이기
api.interceptors.request.use(cfg => {
    // 로그인 요청은 쿠키 전송 안 함
    if (cfg.url === "/api/auth/login") {
        cfg.withCredentials = false;
        return cfg;
    }

    const token = TokenStore.getToken();

    if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
});

let refreshPromise = null; // 진행 중인 refresh를 공유해서 동시에 401이 나도 한 번만 요청

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // 401 에러 -> refresh 한 번하고, 로그인 페이지로
    if (error.response?.status === 401) {
      // 재시도한 요청이면 그대로 reject해서 무한 반복 방지
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true; // 재시도 표시

      try {
        // 이미 refresh 요청 중이면 새로 보내지 않고 그 결과를 기다림
        if (!refreshPromise) {
          refreshPromise = axios
            .post("/api/auth/refresh", {}, { withCredentials: true })
            .then((refreshRes) => refreshRes.data.data.accessToken)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;
        TokenStore.setToken(newAccessToken);


        // 실패했던 요청에 새 토큰 붙이기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // 재요청
      } catch (refreshError) {
        console.error("토큰 재발급 실패", refreshError);
        TokenStore.clearToken();
        // 이미 로그인 페이지면 이동하지 않음 (새로고침 무한 루프 방지)
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;