
import Vue from 'vue'

const state = {
	results: []
}

const mutations = {
    loadResults(state, payload) {
        
        Vue.set(state,'results', payload.results)

    },
    clearResults(state) {
        Vue.set(state,'results', [])
    }
}

const actions = {
	loadResults({commit}, results) {

        let payload = {
            results: results
        }
        commit('loadResults', payload)
    },
    clearResults({commit}) {

        commit('clearResults')
    }
}

const getters = {
    getResults(state) {
        return state.results
    }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}