// const csv = require('csvtojson')
// const birds = await csv().fromFile('./MyEBirdData.csv')
const _ = require('lodash')
const moment = require('moment')

// To convert:
// $ npm i -g csvtojson
// $ csvtojson MyEBirdData.csv > data.json
const birds = require('./data.json')
const mediaData = require('./media.json')

function dedupeByKey (arr, key) {
  const temp = arr.map(el => el[key])
  return arr.filter((el, i) =>
    temp.indexOf(el[key]) === i
  )
}

function removeSpuhs (arr) {
  return arr.filter(s => {
    return !/sp\.|\[|\/|\(/.test(s['Common Name'])
  })
}

function eBirdStats (birds) {
  console.log('Data points: ', birds.length)
  // Dedupe Spuhs
  console.log('Bird spuhs: ', dedupeByKey(birds, 'Scientific Name').length)
}

function speciesCount (birds) {
  // Note: This doesn't quite match Scientific Name. There's something odd going on where there are five more species than there are Commonly Named birds. This does, however, match the eBird count.
  // TODO Why didn't I use dedupeByKey here?
  console.log('Bird species: ', [...new Set(removeSpuhs(birds).map(bird => bird['Common Name']))].length)
}

// Arg provided to account for global vs locational counts
// TODO Would TypeScript help here?
function firstSeen (birds, timespan) {
  let timeOpts = ['total', 'year', 'month', 'day']

  // Remove all later instances of birds
  function filterByOldest (arr) {
    if (!arr) {
      console.log('filterByOldest not provided with arr')
      process.end(1)
    }
    // Note - 01-01 is returned, not 2018-01-01
    return _.map(arr, (i) => {
      return moment(i).isBefore(i)
    })
  }

  // TODO Should I be using momentjs here?
  function combineByDateSegment () {
    // Combine years
  }

  console.log(filterByOldest(birds)[0])

  //return combineByDateSegment(filterByOldest())
}

// TODO This function will link together bird entries from eBird with
// their media equivalents, using the eBird checklist ID, to show whether
// or not (and when, and so on) I have photographed or recorded a bird.
// birds = eBird data
// mediaData = media data from Macaulay Library
function linkPhotographs (birds, media) {
  // TODO Write
}

/* TODO Find birds by country
TODO Find birds by month
TODO Print list of birds by date first seen.
TODO Find out if you can get information about uploaded media
TODO Print a list of days which are the first days that you have
- Seen a bird
  - Life
  - Year
  - Country
  - State
  - County
  - Yard
  - Month
  - Day
- Photographed a bird
  - Life
  - Country
  - State
  - County
- Recorded a bird
  - Life
  - Country
  - State
  - County
 */

eBirdStats(birds)
speciesCount(birds)
// console.log(birds[1])
firstSeen(birds)
