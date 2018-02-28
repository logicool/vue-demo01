import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const state = {
    fetchLoading:false,     //全局加载状态的Loading
}

export default new Vuex.Store({
    strict: debug,
    state,
    modules: {
        login,
    },
    getters,
    mutations,
})