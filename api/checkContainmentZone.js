var axios = require('axios');

const checkContainmentZones = async function (lat, lng, bot) {
    var options = {
        'method': 'POST',
        'url': 'https://data.geoiq.io/dataapis/v1.0/covid/locationcheck',
        'data': {
            "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJ0YXRoYWdhdGxva2hhbmRlQGdtYWlsLmNvbSJ9.cjxsDsFvdElI1xNCCZM67RqEHplnHQ-n2Z_sBgIQWpY",
            "latlngs": [[
                lat, lng
            ]]
        }
    };

    let botResponse = '';
    let dataAvailable = false;
    await axios(options)
        .then((res) => {
            console.log(res.data)
            // if (res.data.containmentsAvailability) {
            //     dataAvailable = true
            //     botResponse += res.data.containmentZoneNames.toString()
            // } else {
            //     dataAvailable = false
            // }
        })
        .catch(err => console.log(err))

    // if (dataAvailable) {
    //     if (botResponse === '') {
    //         await bot.say('There are 0 Contaiment zones within 5km radius of your pincode').catch(err => console.log(err))
    //     } else {
    //         await bot.say('Here are the containment zones near you: ' + botResponse).catch(err => console.log(err))
    //     }
    // } else {
    //     await bot.say('Sorry, we don\'t have containment zone data available for your pincode').catch(err => console.log(err))
    // }

    // await bot.say('Here are the containment zones near you: ' + botResponse).catch(err => console.log(err))
}

module.exports = checkContainmentZones