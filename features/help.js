//
// Command: help
//
module.exports = function (controller) {

    controller.hears('help', 'message,direct_message', async (bot, message) => {

        // let markDown = '**Available commands:**  \n';

        // controller.commandHelp.sort((a, b) => {

        //     return ((a.command < b.command) ? -1 : ((a.command > b.command) ? 1 : 0));
        // });

        // controller.commandHelp.forEach(element => {

        //     markDown += `**${controller.checkAddMention(message.roomType, element.command)}**: ${element.text}  \n`
        // });

        // await bot.reply(message, { markdown: markDown });

        if (!controller.public_url) {
            await bot.reply(message, {
                text: 'Please configure the PUBLIC_URL setting to enable this sample feature'
            });
            return;
        }

        await bot.reply(message, {
            text: 'Help',
            attachments: [
                {
                    'contentType': 'application/vnd.microsoft.card.adaptive',
                    'content': {
                        "type": "AdaptiveCard",
                        "body": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "National",
                                        "data": "national"
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "National stats for Covid 19"
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Local",
                                        "data": "local"
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Covid cases near me"
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Travel",
                                        "data": "travel"
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Want to know more about how to obtain a travel pass"
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Safety",
                                        "data": "safety"
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Know how to protect yourself"
                            },
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Quiz",
                                        "data": "quiz"
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Play a quiz to test your Covid 19 knowledge"
                            }
                        ],
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "version": "1.2"
                    }
                }
            ]
        })
    });

}
