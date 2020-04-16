const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = async (event) => {
  const { public_id, file, tags, eager } = JSON.parse(event.body);

  const res = await cloudinary.uploader.upload(file, {
    public_id,
    resource_type: 'auto',
    tags,
    eager
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(res)
  }
}