const AWS = require('aws-sdk')

require('dotenv').config()

AWS.config.update({
    accessKeyId : process.env.ACCESS_KEY_AWS,
    secretAccessKey : process.env.SECRET_KEY_AWS
})


const s3 = new AWS.S3()

const S3 = {}

S3.putObject = (name, file, cb) => {
    const params = {
        Bucket: process.env.BUCKET_NAME_AWS,
        Key : name,
        Body : file
    }

    s3.upload(params, (err,data) => {
        if(err){
            cb(err, null)
            return
        }
        
        const location = data.Location

        cb(null, location)
    })

}

S3.deleteObject = (name, cb) => {
    
    const params = {
        Bucket: process.env.BUCKET_NAME_AWS,
        Key : name,
    }

    s3.deleteObject(params, (err,data) => {
        if(err) return cb(err,null)
        cb(null, data)
        console.log('delete complete: ' + name)
    })
    
}

module.exports = S3