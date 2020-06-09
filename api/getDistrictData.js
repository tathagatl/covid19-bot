var axios = require('axios');
const fmt = require('indian-number-format');

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
            if (stateData !== undefined) {
                const districtList = Object.keys(stateData)
                const districtData = districtList.filter(key => key === city).reduce((obj, key) => {
                    return stateData[key];
                }, {});
                if (districtData !== undefined) {
                    const { active, confirmed, deceased, recovered } = districtData[districtData.length - 1]
                    const prevDayData = districtData[districtData.length - 2]
                    const prevPrevDayData = districtData[districtData.length - 3]

                    const yesterdayConfirmed = prevDayData.confirmed - prevPrevDayData.confirmed

                    botResponse += `Daily stats for ${city}, ${state}\n`
                    botResponse += `---------------------------------------------------------\n`
                    botResponse += `Confirmed cases till today\t${fmt.format(confirmed)}\n`
                    botResponse += `Active cases till today\t\t${fmt.format(active)}\n`
                    botResponse += `Recovered cases till today\t${fmt.format(recovered)}\n`
                    botResponse += `Casualties till today\t\t\t${fmt.format(deceased)}\n`
                    botResponse += `---------------------------------------------------------\n`
                    botResponse += `Number of new cases registered yesterday\t${fmt.format(yesterdayConfirmed)}\n`
                    botResponse += `---------------------------------------------------------\n`
                }
            }
        })
        .catch(err => console.log(err))

    if (botResponse !== '') await bot.say(botResponse).catch(err => console.log(err))
}

module.exports = getDistrictData