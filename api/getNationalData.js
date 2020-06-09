var axios = require('axios');
const fmt = require('indian-number-format');

const getNationalData = async function (bot) {
    var options = {
        'method': 'GET',
        'url': 'https://api.covid19india.org/data.json'
    };

    let botResponse = '';
    await axios(options)
        .then((res) => {
            const dailyData = res.data.cases_time_series
            const { totalconfirmed, totalrecovered, totaldeceased, dailyconfirmed, dailydeceased, dailyrecovered } = dailyData[dailyData.length - 1]

            const totalActive = totalconfirmed - totalrecovered - totaldeceased
            const dailyActive = dailyconfirmed - dailyrecovered - dailydeceased

            botResponse += `Confirmed cases till today\t${fmt.format(totalconfirmed)}\n`
            botResponse += `Active cases till today\t\t${fmt.format(totalActive)}\n`
            botResponse += `Recovered cases till today\t${fmt.format(totalrecovered)}\n`
            botResponse += `Casualties till today\t\t\t${fmt.format(totaldeceased)}\n`
            botResponse += `---------------------------------------------------------\n`
            botResponse += `Number of new cases registered yesterday\t${fmt.format(dailyconfirmed)}\n`
        })
        .catch(err => console.log(err))

    await bot.say(botResponse).catch(err => console.log(err))
}

module.exports = getNationalData