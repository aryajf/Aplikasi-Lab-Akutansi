const {Article, Comment, User} = require('../models')
const { Op } = require("sequelize")
const Validator = require('validatorjs');
const validatorMessage = require('../config/validatorMessage')
const {compressImage, deleteFile, makeDirectory, createSlug, getPagination, getPagingData} = require('../config/mixins')

module.exports = {
    index: async(req, res) => {
    },
    store: async(req, res) => {
        let article = await Article.findOne({where: {slug: req.params.slug}})
        let commentReq = {
            message: req.body.message,
            user_id: req.decoded.id,
            article_id: article.id
        }

        if(commentValidation(commentReq) != null){
            res.status(400).send(commentValidation(commentReq))
            return
        }
        
        try{
            let newComment = await Comment.create(commentReq)

            res.status(201).json({
                data: {
                    message: newComment.message
                },
                message: 'Komentar berhasil ditambah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + req.url
                },
                status: true,
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat menambah komentar',
                status: false
            })
        }
    },
    delete: async(req, res) => {
        if(req.decoded.role == 'Admin'){
            const article = await findArticle(req.params.slug)
            if(article != null){
                deleteFile(articleCoverPath + article.cover)
                article.destroy()
    
                res.json({
                    data : {
                        id: article.id,
                        title: article.title
                    },
                    message: 'Article berhasil dihapus',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'article/' + req.params.slug
                    },
                    status: true
                })
            }else{res.status(404).json({message : 'Article tidak ditemukan', status: false})}
        }else{res.status(404).json({message : 'Unauthorized', status: false})}
    },
}

function commentValidation(dataRequest){
    let rules = {
        message: 'required',
    }
    
    let validation = new Validator(dataRequest, rules, validatorMessage)
    if(validation.fails()){
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }
}