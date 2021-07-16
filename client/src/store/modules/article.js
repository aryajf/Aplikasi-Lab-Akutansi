import axios from 'axios'
import router from '@/router'

export default({
    namespaced: true,
    state:{
        token: null,
        user: [],
    },
    getters:{
        authenticated(state){
            return state.token && state.user
        },
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USER(state, data){
            state.user = data
        }
    },
    actions: {
        async register({commit},credentials){
            commit('SET_FORM_ERRORS', {}, {root: true})
            commit('SET_BUTTON_LOADING', true, {root: true})
            await axios.post('register', credentials).then(res => {
                commit('SET_BUTTON_LOADING', false, {root: true})        
                window.notyf.success(res.data.message)
                router.push('/login')
            }).catch(err => {
                if(err.response.data.errors){
                    commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                }
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message);
            })
        },
    }
})