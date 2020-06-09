var axios = require('axios');

const getContainmentZones = async function (lat, lng, bot) {
    var options = {
        'method': 'POST',
        'url': 'https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones',
        'data': {
            "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJ0YXRoYWdhdGxva2hhbmRlQGdtYWlsLmNvbSJ9.cjxsDsFvdElI1xNCCZM67RqEHplnHQ-n2Z_sBgIQWpY",
            "lng": lng,
            "lat": lat,
            "radius": 5000
        }
    };

    let botResponse = '';
    let dataAvailable = false;
    await axios(options)
        .then((res) => {
            if (res.data.containmentsAvailability) {
                dataAvailable = true
                botResponse += res.data.containmentZoneNames.join(', ')
                console.log(res.data.containmentZoneNames.toString())
            } else {
                dataAvailable = false
            }
        })
        .catch(err => console.log(err))

    if (dataAvailable) {
        if (botResponse === '') {
            await bot.say('There are 0 Contaiment zones within 5km radius of your pincode').catch(err => console.log(err))
        } else {
            await bot.say('Here are the containment zones near you: ' + botResponse).catch(err => console.log(err))
            await bot.say('------------------------------------------------------------------').catch(err => console.log(err))
        }
    } else {
        await bot.say('Sorry, we don\'t have containment zone data available for your pincode').catch(err => console.log(err))
    }

    // await bot.say('Here are the containment zones near you: ' + botResponse).catch(err => console.log(err))
}

module.exports = getContainmentZones