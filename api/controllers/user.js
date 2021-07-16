const {User} = require('../models')
const { Op } = require("sequelize")
const fs = require('fs')
const path = require('path')
const avatarPath = path.join(__dirname, '../public/images/avatar/')
const {getPagination, getPagingData} = require('../config/mixins')

module.exports = {
    getUsers: async(req, res) => {
        let { page, size } = req.query
        const { limit, offset } = getPagination(page, size, 2)

        await User.findAndCountAll({limit,offset,order:[['updatedAt', 'DESC']],where:{role: 'Member'}}).then(data => {
            const { totalItems, dataPaginate, totalPages, currentPage } = getPagingData(data, page, limit)

            if(dataPaginate.length != 0 && !isNaN(currentPage)){
                res.json({
                    totalItems : totalItems,
                    limitItems : limit,
                    totalPages : totalPages,
                    currentPage : currentPage,
                    users : dataPaginate,
                    message: 'User berhasil ditampilkan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'admin/users'
                    },
                    status: true
                })
            }else{res.json({totalItems : 0,message : 'User tidak ditemukan', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'User tidak ditemukan', status: false})
        })
    },
    showUsers: async(req, res) => {
        await User.findOne({where:{id:req.params.id,role: 'Member'}}).then(user => {
            if(user != null){
                res.json({
                    user : user,
                    message: 'User berhasil ditampilkan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'user/' + req.params.id
                    },
                    status: true
                })
            }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'User tidak ditemukan', status: false})
        })
    },
    searchUsers: async(req, res) => {
        if(req.params.keyword == ''){
            res.status(404).json({message : 'User tidak ditemukan', status: false})
        }
        
        let { page, size } = req.query
        const { limit, offset } = getPagination(page, size, 2)
        await User.findAndCountAll({limit,offset,where:{
            [Op.or]: [{
                nama : {[Op.like]: `%${req.params.keyword}%`},
            },{
                email : {[Op.like]: `%${req.params.keyword}%`},
            },{
                alamat : {[Op.like]: `%${req.params.keyword}%`},
            },{
                phone : {[Op.like]: `%${req.params.keyword}%`},
            }],
            role: 'Member'
        }}).then(data => {
            const { totalItems, dataPaginate, totalPages, currentPage } = getPagingData(data, page, limit)

            if(dataPaginate.length != 0 && !isNaN(currentPage)){
                res.json({
                    totalItems : totalItems,
                    limitItems : limit,
                    totalPages : totalPages,
                    currentPage : currentPage,
                    users : dataPaginate,
                    message: 'User berhasil ditampilkan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'admin/users'
                    },
                    status: true
                })
            }else{res.json({totalItems : 0,message : 'User tidak ditemukan', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'User tidak ditemukan', status: false})
        })
    },
    deleteUser: async(req, res) => {
        const user = await findUser(req.params.id)
        if(user != null){
            deleteFile(avatarPath + user.avatar)
            user.destroy()

            res.json({
                data : {
                    id: user.id,
                    email: user.email,
                    nama: user.nama,
                },
                message: 'Member berhasil dihapus',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'user/' + req.params.id
                },
                status: true
            })
        }else{res.status(404).json({message : 'Member tidak ditemukan', status: false})}
    },
}

function findUser(id){
    return User.findOne({where: {id: id}})
}

function deleteFile(source){
    if(fs.existsSync(source)){
        fs.unlinkSync(source)
    }
}