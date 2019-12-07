const itunes = require('../common/itunes')

exports.getTrack = function(req, res) {
  itunes.lookup(
    {
      id: req.params.id,
      entity: 'song'
    },
    res,
    'single'
  )
}

exports.getAlbum = function(req, res, next) {
  itunes.lookup(
    {
      id: req.params.id,
      entity: 'album'
    },
    res,
    'single',
    false,
    next
  )
}

exports.getAlbumTracks = function(req, res) {
  itunes.lookup(
    {
      id: req.params.id,
      entity: 'song'
    },
    res,
    'many'
  )
}

exports.getArtist = function(req, res, next) {
  itunes.lookup(
    {
      id: req.params.id,
      entity: 'musicArtist'
    },
    res,
    'single',
    false,
    next
  )
}

exports.getArtistAlbums = function(req, res,next) {
  console.log('ok')
  itunes.lookup(
    {
      id: req.params.id,
      entity: 'album'
    },
    res,
    'many',
    false,
    next,
    true
  )
}
