import axios from 'axios'
import router from '@/router'

export default({
    namespaced: true,
    state:{
        articles: [],
        articles_slider: [],
        article: [],
    },
    getters: {
        articles(state){
            return state.articles
        },
        articles_slider(state){
            return state.articles_slider
        },
        article(state){
            return state.article
        },
    },
    mutations: {
        SET_ARTICLES(state, data){
            state.articles = data
        },
        SET_ARTICLES_SLIDER(state, data){
            state.articles_slider = data
        },
        SET_ARTICLE(state, data){
            state.article = data
        },
    },
    actions: {
        async index({commit}, page){
            try{
                let res
                page == null ? res = await axios.get('article') : res = await axios.get(`article?page=${page}`)
                commit('SET_ARTICLES', res.data)
                commit('SET_ARTICLES_SLIDER', res.data)
                return res.data
            }catch(err){
                return err
            }
        },
        async show({commit}, slug){
            try{
                let response = await axios.get(`article/${slug}`)
                commit('SET_ARTICLE', response.data.article)
                return response
            }catch(err){
                return err.response
            }
        },
        async search({commit},data){
            commit('SET_BUTTON_LOADING', true, {root: true})
            try{
                let res
                data.page == null ? res = await axios.get(`article/search/${data}`) : res = await axios.get(`article/search/${data.keyword}?page=${data.page}`)
                commit('SET_BUTTON_LOADING', false, {root: true})
                commit('SET_ARTICLES', res.data)
                return res.data
            }catch(err){
                commit('SET_BUTTON_LOADING', false, {root: true})
                return err
            }
        },
        async create({commit, dispatch}, credentials){
            commit('SET_BUTTON_LOADING', true, {root: true})
            commit('SET_FORM_ERRORS', [], {root: true})          
            try{
                let response = await axios.post('article', credentials)
                setTimeout(function () {
                    dispatch('index')
                    router.push('/article')
                    window.notyf.success(response.data.message)
                    commit('SET_BUTTON_LOADING', false, {root: true})        
                }, 2000)
                return response
            }catch(err){
                if(err.response){
                    if(err.response.data.errors){
                        commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                    }
                    commit('SET_BUTTON_LOADING', false, {root: true})
                    window.notyf.error(err.response.data.message)
                }
                return err.response
            }
        },
        async update({commit, dispatch}, [slug, credentials]){
            commit('SET_BUTTON_LOADING', true, {root: true})
            commit('SET_FORM_ERRORS', [], {root: true})          
            try{
                let response = await axios.put(`article/${slug}`, credentials)
                commit('SET_BUTTON_LOADING', false, {root: true})        
                window.notyf.success(response.data.message)
                dispatch('index')
                return response
            }catch(err){
                if(err.response){
                    if(err.response.data.errors){
                        commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                    }
                    commit('SET_BUTTON_LOADING', false, {root: true})
                    window.notyf.error(err.response.data.message)
                }
                return err.response
            }
        },
        async delete({commit, dispatch}, slug){
            commit('SET_BUTTON_LOADING', true, {root: true})
            try{
                let response = await axios.delete(`article/${slug}`)
                commit('SET_BUTTON_LOADING', false, {root: true})        
                window.notyf.success(response.data.message)
                dispatch("index")
                return response
            }catch(err){
                commit('SET_BUTTON_LOADING', false, {root: true})
                window.notyf.error(err.response.data.message)
                return err.response
            }
        }
    }
})