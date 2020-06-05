const getNationalData = require('../api/getNationalData')

module.exports = function (controller) {
    controller.hears('stats', 'message,direct_message', async (bot, message) => {

        await bot.say('Here are the national stats for COVID19:');
        await getNationalData(bot);
        await bot.say('To know stats and information related to your city use command: pincode');
    });

    controller.commandHelp.push({ command: 'stats', text: 'Get National Stats for COVID19' });

}