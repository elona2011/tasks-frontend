import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        setLoading(state, v) {
            state.loading = v
        }
    }
})