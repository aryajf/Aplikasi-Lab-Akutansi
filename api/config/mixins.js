const imagemin = require("imagemin")
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require("imagemin-pngquant")
const imageminGiflossy = require('imagemin-giflossy')
const fs = require('fs');

async function compressImage(source, destination, sourcePath){
    await imagemin([source], {
        destination: destination,
        plugins: [
            imageminMozjpeg({quality: [20]}),
            imageminPngquant({quality: [0.6, 0.8]}),
            imageminGiflossy({ lossy: 80 })
        ]
    })
    .then(() => {
        deleteFile(sourcePath)
    })
}

function moveFile(source, destination) {
    if(fs.existsSync(source)){
        fs.copyFile(source, destination, (err) => {
            fs.unlinkSync(source);
        })
    }
}

function deleteFile(source) {
    if(fs.existsSync(source)){
        fs.unlinkSync(source);
    }
}

function makeDirectory(source) {
    if(!fs.existsSync(source)){
        fs.mkdirSync(source);
    }
}

function createSlug(string) {
    return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")
}

function getPagination(page, limit) {
    const offset = page ? page * limit : 0

    return { limit, offset }
}

function getPagingData(data, page, limit) {
    const { count: totalItems, rows: dataPaginate } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
    
    return { totalItems, dataPaginate, totalPages, currentPage }
}

module.exports = {
    // modules
    fs,

    // function
    compressImage,
    moveFile,
    deleteFile,
    makeDirectory,
    createSlug,
    getPagination,
    getPagingData,
}