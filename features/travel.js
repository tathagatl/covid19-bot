const { BotkitConversation } = require('botkit');
const getTravelDetails = require('../api/getTravelDetails')

module.exports = function (controller) {

    const convo = new BotkitConversation('travel', controller);

    convo.ask('What is your Pincode (6-Digit Number)?', [
        {
            pattern: new RegExp(/(^[1-9]{1}[0-9]{5}$)/),
            handler: async (response, convo, bot, full_message) => {
                await getTravelDetails(bot, response)
            }
        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_answer');
            }
        }
    ])

    // Thread: bad response
    convo.addMessage({
        text: 'It\'s an invalid pincode, please enter the correct pincode',
        action: 'default', // goes back to the thread's current state, where the question is not answered
    }, 'bad_answer');

    // Thread: yes

    convo.addMessage({
        text: 'https://youtu.be/8c_UJwLq8PI'
    }, 'yes')

    controller.addDialog(convo);

    controller.hears('travel', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('travel');
    });

    controller.on('attachmentActions', async (bot, message) => {

        if (message.value === 'travel') await bot.beginDialog('travel');

    })

    controller.commandHelp.push({ command: 'travel', text: 'Want to know more about how to obtain a travel pass' });
}