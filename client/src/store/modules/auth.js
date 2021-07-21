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
        async login({commit, dispatch}, credentials){
            commit('SET_FORM_ERRORS', {}, {root: true})
            commit('SET_BUTTON_LOADING', true, {root: true})
            await axios.post('login', credentials).then(res => {
                commit('SET_BUTTON_LOADING', false, {root: true})  
                window.notyf.success(res.data.message)
                dispatch('attempt', res.data.token)
                router.push('/')
            }).catch(err => {
                if(err.response.data.errors){
                    commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                }
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message);
            })
        },
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
        async getProfile({commit}){
            await axios.get('profile').then(res => {
                commit('SET_USER', res.data.data)
            }).catch(() => {
                commit('SET_USER', [])
                commit('SET_TOKEN', null)
            })
        },
        async verifyEmail({commit}, data){
            commit('SET_BUTTON_LOADING', true, {root: true})

            await axios.get(`verify/${data.email}/${data.token}`).then(res => {
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.success(res.data.message)
                router.push('/login')
            }).catch(err => {
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message)
            })
        },
        async updateProfile({commit, dispatch}, credentials){
            commit('SET_FORM_ERRORS', {}, {root: true})
            commit('SET_BUTTON_LOADING', true, {root: true})

            let data = await axios.put('profile/update', credentials).then(res => {
                commit('SET_BUTTON_LOADING', false, {root: true})
                setTimeout(function () {
                    dispatch('getProfile')
                }, 1000);
                window.notyf.success(res.data.message)
                return res.data
            }).catch(err => {
                if(err.response.data.errors){
                    commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                }
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message)
                return err.response
            })
            return data
        },
        async updateAvatar({commit, dispatch}, avatar){
            commit('SET_BUTTON_LOADING', true, {root: true})

            let data = await axios.put('profile/updateAvatar', avatar).then(res => {
                setTimeout(function () {
                    dispatch('getProfile')
                    commit('SET_BUTTON_LOADING', false, {root: true})
                    window.notyf.success(res.data.message)
                }, 3000)
                return res
            }).catch(err => {
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message)
                return err.response
            })
            return data
        },
        async changePassword({commit},credentials){
            commit('SET_FORM_ERRORS', {}, {root: true})
            commit('SET_BUTTON_LOADING', true, {root: true})
            await axios.post('password/change', credentials).then(res => {
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.success(res.data.message)
            }).catch(err => {
                if(err.response.data.errors){
                    commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                }
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message)
            })
        },
        async logout({commit}){
            commit('SET_TOKEN', null)
            commit('SET_USER', [])
            window.notyf.success("Berhasil Logout")
            router.push('/')
        }
    }
})