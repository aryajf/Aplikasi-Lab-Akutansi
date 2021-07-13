import axios from 'axios'

export default({
    namespaced: true,
    state:{
        proposals: [],
        proposal: [],
        results: [],
    },
    getters:{
        proposals(state){
            return state.proposals
        },
        proposal(state){
            return state.proposal
        },
        results(state){
            return state.results
        }
    },
    mutations: {
        SET_PROPOSALS(state, data){
            state.proposals = data
        },
        SET_PROPOSAL(state, data){
            state.proposal = data
        },
        SET_RESULTS(state, data){
            state.results = data
        }
    },
    actions: {
        async getProposals({commit}, page){
            try{
                let res
                // Cek jika parameter page ada maka masuk ke get proposal tanpa ?page=
                page == null ? res = await axios.get('proposal') : res = await axios.get(`proposal?page=${page}`)
                commit('SET_PROPOSALS', res.data)
                return res.data
            }catch(err){
                return err
            }
        },
        async getProposal({commit},slug){
            let proposal = axios.get(`proposal/${slug}`).then(res => {
                commit('SET_PROPOSAL', res.data.proposal)
                return res.data
            }).catch(err => {
                return err.response
            })
            return proposal
        },
        async searchProposal({commit},data){
            commit('SET_BUTTON_LOADING', true, {root: true})
            try{
                let res
                // Cek jika parameter data yang isinya page & keyword tidak ada maka masuk ke search proposal tanpa ?page=
                data.page == null ? res = await axios.get(`proposal/search/${data}`) : res = await axios.get(`proposal/search/${data.keyword}?page=${data.page}`)
                commit('SET_BUTTON_LOADING', false, {root: true})
                commit('SET_PROPOSALS', res.data)
                return res.data
            }catch(err){
                commit('SET_BUTTON_LOADING', false, {root: true})
                return err
            }
        },
        async downloadProposal(_, slug){
            console.log(slug);
            try{
                let res = await axios.get(`proposal/download/${slug}`)
                return res.data
            }catch(err){
                return err
            }
        },
    }
})