const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.decoded = {
            id: decoded.id,
            nama: decoded.nama,
            email: decoded.email,
            role: decoded.role
        }

        next()
    }catch(err){
        res.status(401).json({error: err.message, message: 'Problem with token', status: false})
    }
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if(err){
    //         res.status(401).json({error: err.message, message: 'Problem with token', status: false})
    //     }else{
    //         req.decoded = {
    //             id: decoded.id,
    //             nama: decoded.nama,
    //             email: decoded.email
    //         }

    //         next()
    //     }
    // })
}