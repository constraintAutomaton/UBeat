const axios = require('axios')
const PUBLIC_API_KEY = 'kGpyEfufJNVCCSjcBrtQFmJMxcrlSXrtfxgBfzHI'
const rootUrl = 'https://api.discogs.com/'
exports.album = async (req, res, next) => {
  const url = `${rootUrl}database/search?token=${PUBLIC_API_KEY}&q=${req.query.q}&format=album`
  try {
    const { data } = await axios.get(url)
    res.locals.highResImage = data.results[0] != undefined ? data.results[0].cover_image : ''
    next()
  } catch (err) {
    console.error(err && err.response && res.status(err.response.status).send(err.response.data))
    err && err.response && res.status(err.response.status).send(err.response.data)
    res.send(err)
  }
}
exports.artist = async (req, res, next) => {
  let url = `${rootUrl}database/search?token=${PUBLIC_API_KEY}&q=${req.query.q}&type=artist`
  try {
    const { data } = await axios.get(url)

    const id = data != undefined ? data.results[0].id : undefined

    if (id != undefined) {
      url = `${rootUrl}artists/${id}?token=${PUBLIC_API_KEY}`
      let { data } = await axios.get(url)
      res.locals.highResImage = data.images === undefined ? '' : data.images[0].uri
    }

    next()
  } catch (err) {
    console.error(err && err.response && res.status(err.response.status).send(err.response.data))
    err && err.response && res.status(err.response.status).send(err.response.data)
    res.send(err)
  }
}
