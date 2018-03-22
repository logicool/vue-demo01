
import generateRouters from '@/router/routers.js';

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./', true, /(.*)Index\.vue$/)
const routes = requireAll(req)

generateRouters.generate(routes) 
