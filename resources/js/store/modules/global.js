const state = {
    isLoading: false,
    selectedData: {}
};

const getters = {};

const actions = {
    changeIsLoading({ commit }, status) {
        commit("setIsLoading", status);
    },

    changeSelectedDate({ commit }, data) {
        commit("setSelectedData", data);
    }
};

const mutations = {
    setIsLoading(state, { status }) {
        state.isLoading = status;
    },

    setSelectedData(state, { data }) {
        state.selectedData = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
