var axios = require('axios');

const getDistrictData = async function (state, city, bot) {
    var options = {
        'method': 'GET',
        'url': 'https://api.covid19india.org/districts_daily.json'
    };

    let botResponse = '';
    await axios(options)
        .then((res) => {
            const stateList = Object.keys(res.data.districtsDaily)
            const stateData = stateList.filter(key => key === state).reduce((obj, key) => {
                return res.data.districtsDaily[key];
            }, {});
            const districtList = Object.keys(stateData)
            const districtData = districtList.filter(key => key === city).reduce((obj, key) => {
                return stateData[key];
            }, {});
            const { active, confirmed, deceased, recovered } = districtData[districtData.length - 1]

            botResponse += `Daily stats for ${city}, ${state}\n`

            botResponse += `Confirmed\t${confirmed}\n`
            botResponse += `Active\t\t${active}\n`
            botResponse += `Recovered\t${recovered}\n`
            botResponse += `Deceased\t${deceased}\n`
        })
        .catch(err => console.log(err))

    await bot.say(botResponse).catch(err => console.log(err))
}

module.exports = getDistrictData