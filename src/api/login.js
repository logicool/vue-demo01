import { request } from '@/core/request'

export function login(params) {
    return request().post("/user/login", params);
}

export function getUserInfo(token) {
    return request().get("/user/info", { params: { token } });
}

export function logout() {
    return request().post("/user/logout");
}