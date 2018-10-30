import Vue from 'vue'
import Vuex from 'vuex'
import vuexTest from './modules/vuextest.js'
Vue.use(Vuex)
//对外暴露-------
export default new Vuex.Store({
    modules: {
        vuexTest
    }
})