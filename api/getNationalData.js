var axios = require('axios');

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

            botResponse += `${'---------'}\tOverall\tYesterday\n`
            botResponse += `Confirmed\t${totalconfirmed}\t${dailyconfirmed}\n`
            botResponse += `Active\t\t${totalActive}\t${dailyActive}\n`
            botResponse += `Recovered\t${totalrecovered}\t${dailyrecovered}\n`
            botResponse += `Deceased\t${totaldeceased}\t${dailydeceased}\n`
        })
        .catch(err => console.log(err))

    await bot.say(botResponse).catch(err => console.log(err))
}

module.exports = getNationalData