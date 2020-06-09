var axios = require('axios');
var getContainmentZones = require('./getContainmentZone')
var getDistrictData = require('./getDistrictData')
//  var travelPass = require('../data/travelPass')
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

    var error = false;
    var cityLocation = ''
    var stateLocation = ''
    var passLink = ''
    var helplineNo = ''
    var dataAvailable = false

    await axios(options)
        .then(async (res) => {

            const result = res.data.find(item => item.display_name.includes('India'))

            if (result !== undefined) {
                dataAvailable = true
                const latitude = result.lat
                const longitude = result.lon
                const { city, state } = await getCityDetails(latitude, longitude)

                cityLocation += city
                stateLocation += state

                // const link = travelPass.find(item => item.state === state)
                // console.log(link)
                const no = helpline.find(item => item.state === state)
                // if (link !== undefined) passLink += link.link
                if (no !== undefined) helplineNo += no.number

                await getDistrictData(state, city, bot)
                await getContainmentZones(latitude, longitude, bot)
            }

        })
        .catch(err => {
            console.log(err)
            error = true
        })
    if (error) await bot.say('Sorry, we don\'t have data available for your pincode!').catch(err => console.log(err))
    if (stateLocation !== '' && helplineNo !== '') await bot.say({ markdown: 'Call your state helpline number **' + helplineNo + '** for any COVID related help' }).catch(err => console.log(err))
    // if (stateLocation !== '' && passLink !== '') await bot.say('Get your travel pass from: ' + passLink).catch(err => console.log(err))
}

module.exports = getLocation