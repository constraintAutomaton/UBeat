const axios = require('axios')
const qs = require('querystring')

const searchEndPoint = 'http://itunes.apple.com/search?'
const lookupEndPoint = 'http://itunes.apple.com/lookup?'

exports.search = function(parameters, res) {
  queryItunesApi(searchEndPoint + qs.stringify(parameters), res)
}

exports.lookup = function(parameters, res, amount) {
  queryItunesApi(lookupEndPoint + qs.stringify(parameters), res, amount)
}
async function queryItunesApi(url, res, amount) {
  try {
    const { data } = await axios.get(url)

    if (amount == 'many') {
      data.results.splice(0, 1)
      data.results.map(el => {
        if (res.locals.highResImage != undefined) {
          el.highResImage = res.locals.highResImage
        }

        if (res.locals.bio != undefined) {
          el.bio = res.locals.bio
        }
      })
      data.resultCount--
      res.status(200).send(data)
    } else {
      data.results.map(el => {
        if (res.locals.highResImage != undefined) {
          el.highResImage = res.locals.highResImage
        }

        if (res.locals.bio != undefined) {
          el.bio = res.locals.bio
        }
      })
      res.status(200).send(data)
    }
  } catch (err) {
    err && err.response && res.status(err.response.status).send(err.response.data)
  }
}
