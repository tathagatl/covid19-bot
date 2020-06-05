const { BotkitConversation } = require( 'botkit' );

module.exports = function( controller ) {

    const convo = new BotkitConversation( 'guidelines', controller );

    convo.say('Protect yourself')

    convo.say('🧼 Wash your hands frequently\n👄 Avoid touching your eyes, mouth and nose\n💪 Cover your mouth and nose with your bent elbow or tissue when you cough or sneeze\n🚷 Avoid crowded places\n🏠Stay at home if you feel unwell - even with a slight fever and cough\n🤒 If you have a fever, cough and difficulty breathing, seek medical care early - but call by phone first')
    
    convo.ask('Do you want to watch a video? (yes/no/cancel)', [
        {
            pattern: 'yes|ya|yeah|sure|ha',
            handler: async ( response, convo ) => {

                convo.gotoThread( 'yes' );
            }
        },
        {
            pattern: 'no|neh|non|na|nahi|cancel|stop|exit',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'cancel' );
            },
        },
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'bad_answer' );
            }
        }
    ])

    // Thread: bad response
    convo.addMessage({
        text: 'Sorry, I did not understand...',
        action: 'default', // goes back to the thread's current state, where the question is not answered
    }, 'bad_answer' );

    // Thread: cancel
    convo.addMessage({
        text: 'Got it, cancelling...',
        action: 'stop', // this marks the converation as unsuccessful
    }, 'cancel');

    // Thread: yes

    convo.addMessage({
        text: 'https://youtu.be/8c_UJwLq8PI'
    }, 'yes')

    controller.addDialog( convo );

    controller.hears( 'protect', 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'guidelines' );
    });

    controller.commandHelp.push({ command: 'protect', text: 'Know how to protect yourself from COVID19' });

}