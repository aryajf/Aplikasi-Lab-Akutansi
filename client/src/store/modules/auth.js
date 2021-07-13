import axios from 'axios'
import router from '@/router'
// import appConfig from "@/config/app"

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
        async attempt({commit, state}, token){
            if(token){
                commit('SET_TOKEN', token)
            }
            if(!state.token){
                return
            }

            await axios.get('profile').then(res => {
                commit('SET_USER', res.data.data)
            }).catch(() => {
                commit('SET_USER', [])
                commit('SET_TOKEN', null)
            })
        },
        async logout({commit}){
            await axios.get('logout').then(res => {
                commit('SET_TOKEN', null)
                commit('SET_USER', [])
                window.notyf.success(res.data.message)
                router.push('/')
            }).catch(err => {
                window.notyf.error(err.response.data.message)
            })
        }
    }
})