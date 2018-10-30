const state = {
  questions: []
};

const getters = {
  getAllQuestions(state, getters, rootState) {
    return state.questions
  }
};

const actions = {
  questionsAction({ commit, state }, questionsData) {
    commit("setAllQuestions", questionsData);
  },
  currentAction({commit, state}, index) {
    commit('setCurrentState', index)
  }
};

const mutations = {
  setAllQuestions(state, deploy) {
    state.questions = deploy
  },
  setCurrentState(state, deploy) {
    state.current = deploy
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
