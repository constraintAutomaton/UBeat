const axios = require('axios')
const PUBLIC_API_KEY = 'kGpyEfufJNVCCSjcBrtQFmJMxcrlSXrtfxgBfzHI'
const rootUrl = 'https://api.discogs.com/'
exports.album = async (req, res, next) => {
    const query = req.query.q != undefined ? req.query.q : res.locals.data.results[0].collectionName
    const url = `${rootUrl}database/search?token=${PUBLIC_API_KEY}&q=${query}&format=album`
    try {
      const { data } = await axios.get(url)
      res.locals.highResImage = data.results[0] != undefined ? data.results[0].cover_image : ''
      if (res.locals.send != undefined) {
        res.locals.data.results[0].highResImage = res.locals.highResImage
        res.locals.data.results[0].bio = res.locals.bio

        res.send(res.locals.data)
      } else {
        next()
      }
    } catch (err) {
      console.error(err && err.response && res.status(err.response.status).send(err.response.data))
      err && err.response && res.status(err.response.status).send(err.response.data)
      res.send(err)
    }
  
}
exports.artist = async (req, res, next) => {
  const query = req.query.q != undefined ? req.query.q : res.locals.data.results[0].artistName
  let url = `${rootUrl}database/search?token=${PUBLIC_API_KEY}&q=${query}&type=artist`
  try {
    const { data } = await axios.get(url)

    const id = data.results != undefined && data.results.length != 0 ? data.results[0].id : false
    console.log('here!')

    if (id != false) {
      url = `${rootUrl}artists/${id}?token=${PUBLIC_API_KEY}`
      console.log(url)
      let { data } = await axios.get(url)
      res.locals.highResImage = data.images === undefined ? '' : data.images[0].uri
      res.locals.bio = data.profile
    }

    if (res.locals.send != undefined) {
      res.locals.data.results[0].highResImage =
        res.locals.highResImage != undefined ? res.locals.highResImage : ''
      res.locals.data.results[0].bio = res.locals.bio != undefined ? res.locals.bio : ''

      res.send(res.locals.data)
    } else {
      next()
    }
  } catch (err) {
    console.error(err && err.response && res.status(err.response.status).send(err.response.data))
    err && err.response && res.status(err.response.status).send(err.response.data)
    res.send(err)
  }
}
exports.search = async(req,res) =>{
  console.log(req.body)
  const resData ={results:[]}
  for (i in req.body.query) {
    if (String(i) === "5") {
      break
    }
    console.log(i)
    const el =req.body.query[i]
    const url = `${rootUrl}database/search?token=${PUBLIC_API_KEY}&q=${el}&format=album`
    const { data } = await axios.get(url)
    const highResImage = data.results != undefined && data.results.length != 0 ? data.results[0].cover_image : ''

    resData.results.push({
      highResImage:highResImage
    })
    
  }
  res.send(resData)
}