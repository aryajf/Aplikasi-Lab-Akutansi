import axios from 'axios'

export default({
    namespaced: true,
    state:{
        comments: [],
    },
    getters: {
        comments(state){
            return state.comments
        },
    },
    mutations: {
        SET_COMMENTS(state, data){
            state.comments = data
        },
        REMOVE_COMMENT(state, id){
            state.comments.splice(state.comments.findIndex(function(i){
                return i.id === id;
            }), 1);
        },
    },
    actions: {
        async index({commit},slug){
            try{
                let res = await axios.get(`article/comments/${slug}`)
                commit('SET_COMMENTS', res.data)
                return res.data
            }catch(err){
                return err
            }
        },
        async create({commit, dispatch}, data){
            commit('SET_BUTTON_LOADING', true, {root: true})
            commit('SET_FORM_ERRORS', [], {root: true})          
            try{
                 await axios.put(`article/comments/${data.slug}`, {message: data.message}).then(response =>{
                    window.notyf.success(response.data.message)
                    commit('SET_BUTTON_LOADING', false, {root: true})
                    dispatch('index')
                    return response
                })
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
        async delete({state,commit, dispatch}, slug){
            commit('SET_BUTTON_LOADING', true, {root: true})
            try{
                let response = await axios.delete(`article/comments/${slug}`)
                commit('SET_BUTTON_LOADING', false, {root: true})        
                window.notyf.success(response.data.message)
                if(state.comments.length == 1){
                    commit('REMOVE_COMMENT', slug)
                }
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