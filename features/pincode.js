const { BotkitConversation } = require('botkit');
const getLocation = require('../api/getLocation')

module.exports = function (controller) {

    const convo = new BotkitConversation('getPinCode', controller);

    convo.ask('Please enter your Pincode (6-Digit Number)?', [
        {
            pattern: new RegExp(/(^[1-9]{1}[0-9]{5}$)/),
            handler: async (response, convo, bot, full_message) => {
                await getLocation(bot, response)
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

    controller.hears('local', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog('getPinCode');
    });

    controller.on('attachmentActions', async (bot, message) => {

        if (message.value === 'local') await bot.beginDialog('getPinCode');

    })

    controller.commandHelp.push({ command: 'local', text: 'Covid cases near me' });

}