import {
	SET_LOADING
} from './mutation-types.js'

export default {
    // 全局loading状态
    [SET_LOADING](state, res) {
        state.fetchLoading = res
    },
}