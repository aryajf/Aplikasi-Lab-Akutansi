const {User, Contact} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const emailConfig = require('../config/email')
const Validator = require('validatorjs')
const validatorMessage = require('../config/validatorMessage')
const path = require('path')
const avatarPath = path.join(__dirname, '../public/images/avatar/')
const userKtpPath = path.join(__dirname, '../public/images/user-ktp/')
const fotoKtpPath = path.join(__dirname, '../public/images/ktp/')
const {JWT_SECRET, JWT_SECRET_EXPIRES, BASE_URL, MAIL_FROM_ADDRESS} = process.env
const {makeDirectory, compressImage, deleteFile} = require('../config/mixins')

module.exports = {
    login: async(req, res) => {
        // if(!req.body.tokenRecaptcha){
        //     res.status(400).json({
        //         message: 'Human Verification belum anda centang',
        //         status: false,
        //     })
        //     return
        // }

        const userReq = {
            email: req.body.email,
            password: req.body.password
        }

        if(userValidation(userReq, req.url) != null){
            res.status(400).send(userValidation(userReq, req.url))
            return
        }

        let user = await findUser(userReq.email)
        if(!user){
            res.status(404).json({email: userReq.email, message: 'User tidak terdaftar', status: false})
        }else{
            if(!verifyPassword(userReq.password, user.password)) res.status(400).json({message: 'Kombinasi email dan password gk sesuai', status: false})

            if(user.email_status != 'Verified') res.status(400).json({message: 'Verifikasi Email akun anda terlebih dahulu di Gmail', status: false})

            if(user.email_status != 'Verified') res.status(400).json({message: 'Verifikasi Email akun anda terlebih dahulu di Gmail', status: false})

            const expiresToken = parseInt(JWT_SECRET_EXPIRES)

            const expired = new Date(user.token_expired_at) - new Date()
            if (expired <= 0) {
                user.update({token_expired_at: null})
            }

            user.update({token_expired_at: Date.now() + expiresToken})

            const token = jwt.sign(user.toJSON(), JWT_SECRET, {
                expiresIn: JWT_SECRET_EXPIRES
            })

            if(user.role == 'Admin'){
                res.json({
                    data: {
                        id: user.id,
                        email: user.email,
                        nama: user.nama,
                        role: user.role
                    },
                    message: 'Berhasil login',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + req.url
                    },
                    status: true,
                    token: token
                })
            }else if(user.role == 'Member'){
                res.json({
                    data: {
                        id: user.id,
                        email: user.email,
                        nama: user.nama
                    },
                    message: 'Berhasil Login',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + req.url
                    },
                    status: true,
                    token: token
                })
            }
        }
    },
    register: async(req, res) => {
        if(!req.body.tokenRecaptcha){
            res.status(400).json({
                message: 'Human Verification belum anda centang',
                status: false,
            })
            return
        }

        const userReq = {
            email: req.body.email,
            nama: req.body.nama,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        if(userValidation(userReq, req.url) != null){
            res.status(400).send(userValidation(userReq, req.url))
            return
        }

        let user = await findUser(req.body.email)
        if(user){
            res.status(400).json({email: req.body.email, message: 'Alamat email sudah digunakan', status: false})
        }else{
            try{
                let token = crypto.randomBytes(20).toString('hex')
                const newUser = await User.create({
                    email: userReq.email,
                    nama: userReq.nama,
                    password: hashPassword(userReq.password),
                    token: token
                })

                let transporter = nodemailer.createTransport(emailConfig)
                await transporter.sendMail({
                    from: MAIL_FROM_ADDRESS,
                    to: req.body.email,
                    subject: "Verifikasi email - pojoklaku.com",
                    html: `<a href='${BASE_URL}verify/${req.body.email}/${token}' target='_blank'>klik link disini gc</a>`,
                })

                if(newUser.token){
                    setTimeout(async() => {
                        user = await findUser(req.body.email)
                        if(user.email_status != 'Verified'){
                            user.destroy()
                        }
                    }, 3600000)
                }

                res.status(201).json({
                    data: {
                        id: newUser.id,
                        email: newUser.email,
                        nama: newUser.nama
                    },
                    message: 'Berhasil register, cek email anda terlebih dahulu untuk verifikasi',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + req.url
                    },
                    status: true,
                })


            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Terjadi kesalahan saat register',
                    status: false
                })
            }
        }
    },
    profile: async (req, res) => {
        let user = await findUser(req.decoded.email)
        res.json({
            data: {
                email: user.email,
                nama: user.nama,
                no_telp: user.no_telp,
                avatar: user.avatar,
                alamat: user.alamat,
                foto_ktp: user.foto_ktp,
                user_ktp: user.user_ktp,
                user_status: user.user_status,
                role: user.role,
                email_status: user.email_status,
                token_expired_at: user.token_expired_at
            },
            request: {
                method: req.method,
                url: process.env.BASE_URL + req.url
            },
            status: true,
        })
    },
    verifyEmail: async (req, res) => {
        let user = await findUser(req.params.email)
        if(user.token != req.params.token){
            res.status(404).json({
                message: 'Link tidak valid',
                status: false,
            })
        }else{
            user.email_status = 'Verified',
            user.email_verified_at = Date.now()
            user.token = null
            await user.save()

            res.json({
                message: 'Email berhasil diverifikasi',
                status: true,
            })
        }
    },
    forgotPasswordRequest: async(req, res) => {
        try{
            let user = await findUser(req.body.email)
            if(user){
                const token = crypto.randomBytes(20).toString('hex')
                user.token = token
                await user.save()

                let transporter = nodemailer.createTransport(emailConfig)
                await transporter.sendMail({
                    from: MAIL_FROM_ADDRESS,
                    to: req.body.email,
                    subject: "Lupa Password - pojoklaku.com",
                    html: `
                    <p>Link akan kadaluarsa dalam 1 jam</p>
                    <a href='${BASE_URL}password/update/${req.body.email}/${token}' target='_blank'>klik link disini gc</a>
                    `,
                })

                if(user.token){
                    setTimeout(async function(){
                        user.token = null
                        await user.save()
                    }, 3600000)
                }
    
                res.status(201).json({
                    message: 'Silahkan cek email anda untuk mengubah password',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + req.url
                    },
                    status: true,
                })
            }else{
                res.status(404).json({email: req.body.email, message: 'Email tidak ditemukan', status: false})
            }
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Ups, terjadi kesalahan',
                status: false
            })
        }
    },
    updatePassword: async (req, res) => {
        let user = await findUser(req.params.email)
        if(user.token != req.params.token || user.token == null){
            res.status(404).json({
                message: 'Link tidak valid',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + req.url
                },
                status: false,
            })
        }else{
            try{
                user.password = hashPassword(req.body.password),
                user.token = null
                await user.save()

                res.status(201).json({
                    message: 'Password berhasil diganti',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + req.url
                    },
                    status: true,
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Ups, terjadi kesalahan',
                    status: false
                })
            }
        }
    },
    changePassword: async (req, res) => {
        let user = await findUser(req.decoded.email)

        let userReq = {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword,
        }

        if(userValidation(userReq, req.url) != null){
            res.status(400).send(userValidation(userReq, req.url))
            return
        }

        if(!verifyPassword(req.body.oldPassword, user.password)){
            res.status(400).json({message: 'Password lama salah', status: false})
        }else{
            user.password = hashPassword(req.body.newPassword)
            await user.save()

            res.status(201).json({
                message: 'Password berhasil diganti',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + req.url
                },
                status: true,
            })
        }
    },
    updateProfile: async (req, res) => {
        let user = await findUser(req.decoded.email)
        let userReq = {
            nama: req.body.nama,
            no_telp: req.body.no_telp,
            avatar: user.avatar,
            alamat: req.body.alamat,
        }

        if(userReq.no_telp == 'null'){
            userReq.no_telp = ''
        }

        if(userReq.alamat == 'null'){
            userReq.alamat = ''
        }
        
        if(req.file){
            if(userValidation(userReq, req.url) != null){
                res.status(400).send(userValidation(userReq, req.url))
                deleteFile(req.file.path)
                return
            }
            userReq.avatar = req.file.filename
            compressImage('public/uploads/'+req.file.filename, avatarPath, req.file.path)
            deleteFile(avatarPath + user.avatar)
        }else{
            if(userValidation(userReq, req.url) != null){
                res.status(400).send(userValidation(userReq, req.url))
                return
            }
        }

        try{
            user.update(userReq).then(data => {
                res.status(200).json({
                    data: {
                        email: data.email,
                        nama: data.nama,
                        avatar: data.avatar
                    },
                    message: 'User berhasil diedit',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'user/' + req.decoded.email
                    },
                    status: true,
                })
            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat mengedit profile',
                status: false
            })
        }
    },
    updateIdentity: async (req, res) => {
        let user = await findUser(req.decoded.email)

        let userReq = {
            foto_ktp: user.foto_ktp,
            user_ktp: user.user_ktp,
            user_status: 'Verified'
        }

        if(!req.files.foto_ktp && !req.files.user_ktp){
            userReq.foto_ktp = null
            userReq.user_ktp = null
        }else if(req.files.foto_ktp && req.files.user_ktp){
            userReq.foto_ktp = req.files.foto_ktp[0].filename
            userReq.user_ktp = req.files.user_ktp[0].filename
        }else if(!req.files.foto_ktp){
            userReq.user_ktp = req.files.user_ktp[0].filename
            deleteFile(req.files.user_ktp[0].path)
        }else if(!req.files.user_ktp){
            userReq.foto_ktp = req.files.foto_ktp[0].filename
            deleteFile(req.files.foto_ktp[0].path)
        }

        if(userReq.foto_ktp === null){
            res.status(400).json({
                message: 'Foto KTP belum anda tambahkan',
                status: false
            })
            return
        }else if(userReq.user_ktp === null){
            res.status(400).json({
                message: 'Foto Selfie dengan KTP belum anda tambahkan',
                status: false
            })
            return
        }

        try{
            makeDirectory(fotoKtpPath)
            makeDirectory(userKtpPath)
            compressImage('public/uploads/'+req.files.foto_ktp[0].filename, fotoKtpPath, req.files.foto_ktp[0].path)
            compressImage('public/uploads/'+req.files.user_ktp[0].filename, userKtpPath, req.files.user_ktp[0].path)
            deleteFile(fotoKtpPath + user.foto_ktp)
            deleteFile(userKtpPath + user.user_ktp)

            user.update(userReq).then(data => {
                res.status(200).json({
                    data: {
                        foto_ktp: data.foto_ktp,
                        user_ktp: data.user_ktp
                    },
                    message: 'Identitas berhasil diunggah',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'user/' + req.decoded.email
                    },
                    status: true,
                })
            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat mengedit profile',
                status: false
            })
        }
    },
    logout: async (req, res) => {
        let user = await findUser(req.decoded.email)
        let userReq = {
            token_expired_at: null
        }

        try{
            user.update(userReq).then(() => {
                res.status(200).json({
                    message: 'Berhasil Logout',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'logout/' + req.decoded.email
                    },
                    status: true,
                })
            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat logout',
                status: false
            })
        }
    },
}

function findUser(email){
    return User.findOne({where: {email: email}})
}

function hashPassword(password){
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}


function userValidation(dataRequest, url){
    let rules
    if(url == '/register'){
        rules = {
            nama: 'required|min:3',
            email: 'required|email|min:5',
            password: 'required|min:5',
            confirmPassword: 'required|min:5|same:password'
        }
    }else if(url == '/login'){
        rules = {
            email: 'required|email|min:5',
            password: 'required|min:5',
        }
    }else if(url == '/contact'){
        rules = {
            username: 'required|min:3',
            email: 'required|email|min:5',
            message: 'required|min:3'
        }
    }else if(url == '/password/change'){
        rules = {
            oldPassword: 'required|min:5',
            newPassword: 'required|min:5',
            confirmNewPassword: 'required|min:5|same:newPassword'
        }
    }else if(url == '/profile/update'){
        rules = {
            nama: 'required|min:3',
            no_telp: 'required|numeric|min:10',
            alamat: 'required|min:10',
        }
    }else if(url == '/profile/updateIdentity'){
        rules = {
            foto_ktp: 'required',
            user_ktp: 'required'
        }
    }

    let validation = new Validator(dataRequest, rules, validatorMessage)
    if(validation.fails()){
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }

}