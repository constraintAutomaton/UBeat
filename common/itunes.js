const axios = require('axios')
const qs = require('querystring')

const searchEndPoint = 'http://itunes.apple.com/search?'
const lookupEndPoint = 'http://itunes.apple.com/lookup?'

exports.search = function(parameters, res) {
  queryItunesApi(searchEndPoint + qs.stringify(parameters), res)
}

exports.lookup = function(
  parameters,
  res,
  amount,
  send = true,
  next = false,
  isAlbumArtist = false
) {
  queryItunesApi(lookupEndPoint + qs.stringify(parameters), res, amount, send, next, isAlbumArtist)
}
async function queryItunesApi(url, res, amount, send = true, next = false, isAlbumArtist = false) {
  try {
    const { data } = await axios.get(url)

    if (amount == 'many') {
      data.results.splice(0, 1)
      if (res.locals.highResImage != undefined) {
        data.results[0].highResImage = res.locals.highResImage
      }
      if (res.locals.bio != undefined) {
        data.results[0].highResImage = res.locals.bio
      }

      data.resultCount--
      if (send === true) {
        res.status(200).send(data)
      } else {
        res.locals.data = data
        res.locals.send = false

        next()
      }
    } else {
      if (res.locals.highResImage != undefined) {
        data.results[0].highResImage = res.locals.highResImage
      }

      if (res.locals.bio != undefined) {
        data.results[0].bio = res.locals.bio
      }

      if (send === true) {
        res.status(200).send(data)
      } else {
        res.locals.data = data

        res.locals.send = false

        next()
      }
    }
  } catch (err) {
    err && err.response && res.status(err.response.status).send(err.response.data)
  }
}
