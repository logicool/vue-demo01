import { request } from '@/core/request';
import { queryStringify } from '@/core/utils';


export function fetchList(query) {
    return request().get('/table/list', { params: query });
}

export function fetchDatil(params) {
    return request().get('/table/detail' + queryStringify(params))
}