const {Article} = require('../models')
const { Op } = require("sequelize")
const path = require('path')
const articleCoverPath = path.join(__dirname, '../public/images/articles/')
const Validator = require('validatorjs');
const validatorMessage = require('../config/validatorMessage')
const {compressImage, deleteFile, makeDirectory, createSlug, getPagination, getPagingData} = require('../config/mixins')

module.exports = {
    index: async(req, res) => {
        let { page } = req.query
        const { limit, offset } = getPagination(page, 9)
        
        await Article.findAndCountAll({limit,offset,order:[['updatedAt', 'DESC']]}).then(data => {
            const { totalItems, dataPaginate, totalPages, currentPage } = getPagingData(data, page, limit)
            
            if(dataPaginate.length != 0 && !isNaN(currentPage)){
                res.json({
                    totalItems : totalItems,
                    limitItems : limit,
                    totalPages : totalPages,
                    currentPage : currentPage,
                    article : dataPaginate,
                    message: 'Article berhasil ditampilkan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'article'
                    },
                    status: true
                })
            }else{res.json({totalItems : 0,article: dataPaginate, message : 'Article masih kosong', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'Article masih kosong', status: false})
        })
    },
    search: async(req, res) => {
        if(req.params.keyword == ''){
            res.status(404).json({message : 'Article tidak ditemukan', status: false})
        }

        let { page } = req.query
        const { limit, offset } = getPagination(page, 9)
        
        await Article.findAndCountAll({limit,offset,order:[['updatedAt', 'DESC']],where:{
            title : {
                [Op.like]: `%${req.params.keyword}%`,
            }
        }}).then(data => {
            const { totalItems, dataPaginate, totalPages, currentPage } = getPagingData(data, page, limit)

            if(dataPaginate.length != 0 && !isNaN(currentPage)){
                res.json({
                    totalItems : totalItems,
                    limitItems : limit,
                    totalPages : totalPages,
                    currentPage : currentPage,
                    article : dataPaginate,
                    message: 'Pencarian article berhasil',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'article'
                    },
                    status: true
                })
            }else{res.json({totalItems : 0, message : 'Article tidak ditemukan', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'Article tidak ditemukan', status: false})
        })
    },
    show: async(req, res) => {
        const article = await findArticle(req.params.slug)
        if(article != null){
            res.json({
                article : article,
                message: 'Article berhasil ditampilkan',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'article/' + req.params.slug
                },
                status: true
            })
        }else{res.status(404).json({message : 'Article tidak ditemukan', status: false})}
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
    update: async(req, res) => {
        let article = await findArticle(req.params.slug)
        
        if(article == null){
            res.status(404).json({message : 'Article tidak ditemukan', status: false})
            deleteFile(req.files.cover[0].path)
            return 
        }
        
        let articleReq = {
            title: req.body.title,
            short_desc: req.body.short_desc,
            long_desc: req.body.long_desc,
            cover: '',
        }
        
        if(!req.files.cover){
            articleReq.cover = article.cover
            if(articleValidation(articleReq) != null){
                res.status(400).send(articleValidation(articleReq))
                return
            }

        }else if(req.files.cover){
            console.log(1);
            articleReq.cover = req.files.cover[0].filename
            if(articleValidation(articleReq) != null){
                res.status(400).send(articleValidation(articleReq))
                deleteFile(req.files.cover[0].path)
                return
            }
            compressImage('public/uploads/'+req.files.cover[0].filename, articleCoverPath, req.files.cover[0].path)
            deleteFile(articleCoverPath + article.cover)
        }

        try{
            article.update(articleReq)
            res.status(201).json({
                data: {
                    id: article.id,
                    title: article.title
                },
                message: 'Article berhasil diubah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'article/' + req.params.slug
                },
                status: true,
            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat mengubah article',
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