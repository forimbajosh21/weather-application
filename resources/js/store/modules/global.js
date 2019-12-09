const state = {
    isLoading: true,
    selectedData: [],
    city: {},
    listOfData: []
};

const getters = {};

const actions = {
    changeIsLoading({ commit }, status) {
        commit("setIsLoading", status);
    },

    changeSelectedDate({ commit }, data) {
        commit("setSelectedData", data);
    },

    changeListOfData({ commit }, data) {
        commit("setListOfData", data);
    },

    changeCity({ commit }, data) {
        commit("setCity", data);
    }
};

const mutations = {
    setIsLoading(state, status) {
        state.isLoading = status;
    },

    setSelectedData(state, data) {
        state.selectedData = data;
    },

    setListOfData(state, data) {
        state.listOfData = data;
    },

    setCity(state, data) {
        state.city = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
