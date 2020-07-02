import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,
        showSnackbar: false,
        snackbarContent: ''
    },
    mutations: {
        setLoading(state, v) {
            state.loading = v
        },
        setSnackbar(state, v) {
            state.showSnackbar = v
        },
        setSnackbarContent(state, c) {
            state.snackbarContent = c
        }
    }
})