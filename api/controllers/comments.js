const {Article, Comment, User} = require('../models')
const { Op } = require("sequelize")
const Validator = require('validatorjs');
const validatorMessage = require('../config/validatorMessage')
const {compressImage, deleteFile, makeDirectory, createSlug, getPagination, getPagingData} = require('../config/mixins')

module.exports = {
    index: async(req, res) => {
    },
    store: async(req, res) => {
        let slug, title = req.body.title
        title == null ? slug = title : slug = createSlug(title)

        let articleReq = {
            title: req.body.title,
            slug: slug,
            short_desc: req.body.short_desc,
            long_desc: req.body.long_desc,
            cover: '',
        }

        if(req.files.cover){
            articleReq.cover = req.files.cover[0].filename
        }

        if(articleValidation(articleReq) != null){
            res.status(400).send(articleValidation(articleReq))
            return
        }
        
        try{
            let checkSlug = await Article.findOne({where: {slug: articleReq.slug}})
            if(checkSlug){
                articleReq.slug = createSlug(req.body.title) + '-' + new Date().getTime()
            }

            let newArticle = await Article.create(articleReq)

            makeDirectory(articleCoverPath)
            compressImage('public/uploads/'+req.files.cover[0].filename, articleCoverPath, req.files.cover[0].path)

            res.status(201).json({
                data: {
                    slug: newArticle.slug,
                    title: newArticle.title
                },
                message: 'Article berhasil ditambah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + req.url
                },
                status: true,
            })
        }catch(err){
            deleteFile(req.files.cover[0].path)
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat menambah article',
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

function findArticle(slug){
    return Article.findOne({where: {slug: slug}})
}

function articleValidation(dataRequest){
    let rules = {
        title: 'required|min:3',
        short_desc: 'required',
        long_desc: 'required',
        cover: 'required',
    };
    
    let validation = new Validator(dataRequest, rules, validatorMessage);
    if(validation.fails()){
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }
}