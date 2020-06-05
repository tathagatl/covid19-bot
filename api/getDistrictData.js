var axios = require('axios');

const getDistrictData = async function (state, city, bot) {
    var options = {
        'method': 'GET',
        'url': 'https://api.covid19india.org/districts_daily.json'
    };

    let botResponse = '';
    await axios(options)
        .then((res) => {
            const dailyData = res.data.districtsDaily.Maharashtra.Pune
            const { active, confirmed, deceased, recovered } = dailyData[dailyData.length - 1]

            botResponse += `Daily stats for ${city}, ${state}\n`

            botResponse += `Confirmed\t${confirmed}\n`
            botResponse += `Active\t\t${active}\n`
            botResponse += `Recovered\t${recovered}\n`
            botResponse += `Deceased\t${deceased}\n`
            console.log(botResponse)
        })
        .catch(err => console.log(err))

    await bot.say(botResponse).catch(err => console.log(err))
}

module.exports = getDistrictData