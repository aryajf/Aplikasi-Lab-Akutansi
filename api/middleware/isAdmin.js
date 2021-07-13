module.exports = (req, res, next) => {
    switch (req.decoded.role) {
        case 'Admin':
            next()
            break
        default:
            res.status(403).json({message: 'Access denied', status: false})
            break
    }
}