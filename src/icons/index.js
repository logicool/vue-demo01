import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)
// require.context + requireAll 加载符合条件的所有svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)