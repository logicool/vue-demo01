import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import * as getters from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const state = {
    userRoles: 99,
}

export default new Vuex.Store({
    strict: debug,
    state,
    modules: {
        login,
    },
    getters,
})