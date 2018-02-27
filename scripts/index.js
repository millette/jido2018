'use strict'

// npm
const normImp = require('normalize-url')
const got = require('got')

const normOpts = {
  stripWWW: false,
  removeTrailingSlash: false,
  removeDirectoryIndex: true,
  sortQueryParameters: false
}

const norm = (u) => {
  u = u.trim()
  if (!u) { return console.error('noURL') }
  if (u === '#ref!') { return console.error('URL:', u) }
  if (u === 'http://ens.lacity.org/clk/councilagendas/clkcouncilagendas3118730_02202018.html (sample agenda)') {
    u = 'http://ens.lacity.org/clk/councilagendas/clkcouncilagendas3118730_02202018.html'
  }
  if (u.indexOf(' ') !== -1) { return console.error('URL spaced:', u) }
  return normImp(u, normOpts)
}

const tr = (entry) => {
  if (!entry.gsx$longitude.$t) { return false }
  if (!entry.gsx$latitude.$t) { return false }

  const coordinates = [parseFloat(entry.gsx$longitude.$t), parseFloat(entry.gsx$latitude.$t)]
  const place = entry.gsx$place.$t
  const program = entry.gsx$program.$t
  const ret = {
    type: 'Feature',
    properties: { place, program },
    geometry: { type: 'Point', coordinates }
  }

  let urlTmp = entry.gsx$url.$t.toLowerCase()
  switch (urlTmp) {
    case '#n/a':
    case 'tbd':
    case '':
      break

    default:
      urlTmp = norm(urlTmp)
      if (urlTmp && !urlTmp.indexOf('http')) { ret.properties.url = urlTmp }
  }

  const nParticipants = parseInt(entry.gsx$numberofparticipants.$t, 10)
  if (nParticipants) { ret.properties.nParticipants = nParticipants }
  if (entry.gsx$organizers.$t) { ret.properties.organizers = entry.gsx$organizers.$t }
  return ret
}

const transform = (feed) => JSON.stringify({
  type: 'FeatureCollection',
  origin: 'https://opendataday.org',
  updated: feed.updated.$t,
  features: feed.entry.map(tr).filter(Boolean)
})

const run = () => got('https://spreadsheets.google.com/feeds/list/1cV43fuzwy2q2ZKDWrHVS6XR4O8B01eLevh4PD6nCENE/4/public/full?alt=json', { json: true })
  .then((x) => x.body && x.body.feed)
  .then(transform)

module.exports = run
