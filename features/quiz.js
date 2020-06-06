const { BotkitConversation } = require('botkit');
const quizData = require('../data/quiz')
const questionConvo = require('../helper/quizHelper')

module.exports = function (controller) {

    const shuffled = quizData.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 5);

    const convo = new BotkitConversation('quiz_chat', controller);

    convo.ask('Ready for a challenge? (yes/no/cancel)', [
        {
            pattern: 'yes|ya|yeah|sure|oui|si',
            handler: async (response, convo) => {

                convo.gotoThread('quiz');
            }
        },
        {
            pattern: 'no|neh|non|na|birk|cancel|stop|exit',
            handler: async (response, convo) => {

                await convo.gotoThread('cancel');
            },
        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_answer');
            }
        }
    ]);

    // Thread: bad response
    convo.addMessage({
        text: 'Sorry, I did not understand...',
        action: 'default', // goes back to the thread's current state, where the question is not answered
    }, 'bad_answer');

    // Thread: cancel
    convo.addMessage({
        text: 'Got it, cancelling...',
        action: 'stop', // this marks the converation as unsuccessful
    }, 'cancel');

    // Thread: quiz

    convo.addMessage('Let\'s go...', 'quiz');

    questionConvo(convo, selected)

    controller.addDialog(convo);


    controller.hears('quiz', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('quiz_chat');
    });

    controller.commandHelp.push({ command: 'quiz', text: 'Test your knowledge about COVID19' });

}