//
// Fallback Command
//
module.exports = function (controller) {

    controller.on('message,direct_message', async (bot, message) => {

        let markDown = `Sorry, I did not understand. Please try one of the following commands.`;

        await bot.reply(message, { markdown: markDown });

        await bot.reply(message, {
            text: 'Help',
            attachments: [
                {
                    'contentType': 'application/vnd.microsoft.card.adaptive',
                    'content': {
                        "type": "AdaptiveCard",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "Here is a list of things that I can do for you. You can either click on the appropriate button and type the instruction.",
                                "wrap": true
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "National",
                                                        "data": "national"
                                                    }
                                                ],
                                                "height": "stretch"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "View the number of Covid 19 cases in India and related statistics",
                                                "wrap": true
                                            }
                                        ],
                                        "horizontalAlignment": "Left",
                                        "verticalContentAlignment": "Bottom"
                                    }
                                ],
                                "style": "accent"
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Local",
                                                        "data": "local"
                                                    }
                                                ],
                                                "height": "stretch"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "View the number of Covid 19 cases and containment zones near my area",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Bottom"
                                    }
                                ],
                                "style": "accent"
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Travel",
                                                        "data": "travel"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Want to travel within your city? Know more about applying for a travel pass",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Bottom"
                                    }
                                ],
                                "style": "accent"
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Safety",
                                                        "data": "safety"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Know more about protecting yourself from Covid 19",
                                                "wrap": true
                                            }
                                        ]
                                    }
                                ],
                                "style": "accent"
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.Submit",
                                                        "title": "Quiz",
                                                        "data": "quiz"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Play a quiz to test your Covid 19 knowledge",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    }
                                ],
                                "style": "accent"
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