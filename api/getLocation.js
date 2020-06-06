var axios = require('axios');
var getContainmentZones = require('./getContainmentZone')
var getDistrictData = require('./getDistrictData')
var travelPass = require('../data/travelPass')
var helpline = require('../data/helpline')

const getLocation = async function (bot, pin) {

    var options = {
        'method': 'GET',
        'url': 'https://eu1.locationiq.com/v1/search.php?key=790a0c91673f23&format=json&q=' + pin
    };

    var getCityDetails = async (lat, lon) => {
        let options2 = {
            'method': 'GET',
            'url': `https://us1.locationiq.com/v1/reverse.php?key=790a0c91673f23&lat=${lat}&lon=${lon}&format=json`
        };
        let city, state;
        await axios(options2)
            .then(async (res) => {
                city = res.data.address.city
                state = res.data.address.state
            })
        return { city, state }
    }

    var location = ''
    var passLink = ''
    var helplineNo = ''

    await axios(options)
        .then(async (res) => {

            const result = res.data.find(item => item.display_name.includes('India'))


            const latitude = result.lat
            const longitude = result.lon
            const { city, state } = await getCityDetails(latitude, longitude)

            location += city + ' ' + state
            passLink += travelPass.find(item => item.state === state).link
            helplineNo += helpline.find(item => item.state === state).number

            await getDistrictData(state, city, bot)
            await getContainmentZones(latitude, longitude, bot)

        })
        .catch(err => {
            console.log(err)
        })
    await bot.say('Call your state helpline number ' + helplineNo + ' for any COVID related help').catch(err => console.log(err))
    await bot.say('Get your travel pass from: ' + passLink).catch(err => console.log(err))
}

module.exports = getLocation