const { BotkitConversation } = require('botkit');
const quizData = require('../data/quiz')
const questionConvo = require('../helper/quizHelper')

module.exports = function (controller) {

    // Randomly select question

    const shuffled = quizData.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 5);

    const convo = new BotkitConversation('quiz_chat', controller);

    // convo.ask('Ready for a challenge? (yes/no)', [
    //     {
    //         pattern: 'yes|ya|yeah|sure|oui|si',
    //         handler: async (response, convo) => {

    //             convo.gotoThread('quiz');
    //         }
    //     },
    //     {
    //         pattern: 'no|neh|non|na|birk|cancel|stop|exit',
    //         handler: async (response, convo) => {

    //             await convo.gotoThread('cancel');
    //         },
    //     },
    //     {
    //         default: true,
    //         handler: async (response, convo) => {
    //             await convo.gotoThread('bad_answer');
    //         }
    //     }
    // ]);

    // // Thread: bad response
    // convo.addMessage({
    //     text: 'Sorry, I did not understand...',
    //     action: 'default', // goes back to the thread's current state, where the question is not answered
    // }, 'bad_answer');

    // // Thread: cancel
    // convo.addMessage({
    //     text: 'Got it!',
    //     action: 'stop', // this marks the converation as unsuccessful
    // }, 'cancel');

    // // Thread: quiz
    convo.addMessage('Let\'s go...Type either a, b, c or d to answer !', 'quiz');
    convo.addAction('quiz');

    questionConvo(convo, selected)

    controller.addDialog(convo);


    controller.hears('quiz', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('quiz_chat');
    });

    controller.on('attachmentActions', async (bot, message) => {

        if (message.value === 'quiz') await bot.beginDialog('quiz_chat');

    })

    controller.commandHelp.push({ command: 'quiz', text: 'Play a quiz to test your covid 19 knowledge' });

}