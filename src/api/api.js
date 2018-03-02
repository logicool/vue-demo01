import { request } from './request';


export const api_do_login = params => {return request().post("/login", params);};