import { request } from '@/core/request'

export function login(username, password) {
    return request().post("/user/login", { username, password });
}

export function getUserInfo(token) {
    return request().get("/user/info", { params: token });
}

export function logout() {
    return request().post("/user/logout");
}