'use strict'
const {Storage} = require('@google-cloud/storage')
const fs = require('fs')
const dateFormat = require('dateformat')

// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
    projectId: '[PROJECT ID]',
    keyFilename: '[PATH TO SERVICE ACCOUNT KEY JSON]' //example: ./serviceaccountkey.json (file ini bisa didapatkan ketika membuat service account)
})

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = '[BUCKET NAME]'
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {}

ImgUpload.uploadToGcs = (req, res, next) => {
    if (!req.file) return next()

    const gcsname = dateFormat(new Date(), "yyyymmdd-HHMMss")
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })

    stream.end(req.file.buffer)
}

module.exports = ImgUpload
