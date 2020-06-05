const { BotkitConversation } = require('botkit');
const getLocation = require('../api/getLocation')

module.exports = function (controller) {

    const convo = new BotkitConversation('getPinCode', controller);

    convo.ask('What is your Pin Code? (6 Digit Number)', [
        {
            pattern: new RegExp(/([1-9]{1}[0-9]{5})/),
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
        text: 'Sorry, I did not understand...',
        action: 'default', // goes back to the thread's current state, where the question is not answered
    }, 'bad_answer');

    // Thread: yes

    convo.addMessage({
        text: 'https://youtu.be/8c_UJwLq8PI'
    }, 'yes')

    controller.addDialog(convo);

    controller.hears('pincode', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog('getPinCode');
    });

    controller.commandHelp.push({ command: 'pincode', text: 'Show available information related to your pincode' });

}