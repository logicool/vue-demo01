import request from '@/api/request.js';
import { DO_LOGIN } from '../mutation-types.js'
const state = {
    status: '',
    email: '',
    auth_type: '',
    token: undefined,
    nick_name: '',
    avatar: '',
    introduction: '',
    roles: [2],
  }

const getters = {}

const mutations = {
  [DO_LOGIN](state, res) {
    if (res.data && res.data.success && res.data.data) {
      //state = {...state, ...res.data.data}
      let rs = res.data.data;
      state.status = rs.status;
      state.email = rs.email;
      state.auth_type = rs.auth_type;
      state.token = rs.token;
      state.nick_name = rs.nick_name;
      state.avatar = rs.avatar;
      state.introduction = rs.introduction;
      state.roles = rs.roles;
    }
  }
} 

const actions = {
    doLogin({commit}) {
      request({
        method:'post',
        url:"/login"
      }).then(response=>{
        console.log('dologin')
        commit(DO_LOGIN, response)
      })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }