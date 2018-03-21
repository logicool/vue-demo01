import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission'
import getters from './getters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    modules: {
        app,
        user,
        permission
    },
    getters,
})