var axios = require('axios');
var getContainmentZones = require('./getContainmentZone')
var getDistrictData = require('./getDistrictData')
var travelPass = require('../data/travelPass')
var helpline = require('../data/helpline')

const getLocation = async function (bot, pin) {

    var options = {
        'method': 'GET',
        'url': 'https://atlas.mapmyindia.com/api/places/geocode?address=' + pin,
        'headers': {
            'Authorization': 'e426fe2c-5366-4cae-86ba-e7063c954615'
        }
    };

    var location = ''
    var passLink = ''
    var helplineNo = ''

    await axios(options)
        .then(async (res) => {

            const state = res.data.copResults.state
            const city = res.data.copResults.city
            const latitude = res.data.copResults.latitude
            const longitude = res.data.copResults.longitude

            location += res.data.copResults.district + ' ' + res.data.copResults.state
            passLink += travelPass.find(item => item.state === state).link
            helplineNo += helpline.find(item => item.state === state).number

            await getDistrictData(state, city, bot)
            await getContainmentZones(latitude, longitude, bot)

        })
        .catch(err => {
            if (err.response.data.error === 'invalid_token') console.log(err)
        })
    await bot.say('Call your state helpline number ' + helplineNo + ' for any COVID related help').catch(err => console.log(err))
    await bot.say('Get your travel pass from: ' + passLink).catch(err => console.log(err))
}

module.exports = getLocation