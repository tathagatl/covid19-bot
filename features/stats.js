const getNationalData = require('../api/getNationalData')

module.exports = function (controller) {
    controller.hears('national', 'message,direct_message', async (bot, message) => {

        await bot.say('Here are the national stats for COVID19:');
        await bot.say('---------------------------------------------------------\n');
        await getNationalData(bot);
        // await bot.say('To know stats and information related to your city use command: pincode');
    });

    controller.on('attachmentActions', async (bot, message) => {

        if (message.value === 'national') {
            await bot.say('Here are the national stats for COVID19:\n');
            await bot.say('---------------------------------------------------------\n');
            await getNationalData(bot);
            // await bot.say('To know stats and information related to your city use command: pincode');
        }

    })

    controller.commandHelp.push({ command: 'national', text: 'National stats for covid 19' });

}