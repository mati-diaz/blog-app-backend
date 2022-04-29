const { PutObjectCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");
const { S3Client } = require('@aws-sdk/client-s3');
const path = require("path");
const fs = require("fs");

const region = process.env.AWS_REGION;

const s3Client = new S3Client({ region });

const uploadAWS = async (image, folder) => {
    const file = path.join(__dirname, `../uploads/${image.filename}`);
    const fileStream = fs.createReadStream(file);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${folder}/${image.filename}`,
        Body: fileStream,
        ACL: 'public-read',
        ContentType: image.mimetype
    };

    // Create an Amazon S3 bucket.
    try {
        const data = await s3Client.send(
            new CreateBucketCommand({ Bucket: params.Bucket })
        );
    } catch (err) {
        console.log("Error", err);
    }
    // Create an object and upload it to the Amazon S3 bucket.
    try {
        await s3Client.send(new PutObjectCommand(params));
        const location = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        fs.unlink(file, error => {
            if (error) throw error;
        });
        return location;
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports = uploadAWS;