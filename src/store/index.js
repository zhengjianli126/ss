import Vue from "vue";
import Vuex, { Store } from "vuex";
import questions from "./modules/questions";
Vue.use(Vuex);

var store = new Store({
    modules: {
        questions
    },
    state: {
        tag: []
    },
    mutations: {
        saveArticle(state, data) {
            state.tag = data;
            console.log(state.tag)
        },
        tagGive(state, data) {

        }
    }
});

export default store;