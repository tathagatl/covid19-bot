const questionConvo = (convo, question) => {
    var score = 0

    // question 1

    let questionDisplay = ''
    questionDisplay += `1.\t${question[0].question}\n`
    questionDisplay += `-------------------------------------------------------\n`
    questionDisplay += `a.\t${question[0].option1}\n`
    questionDisplay += `b.\t${question[0].option2}\n`
    questionDisplay += question[0].option3 ? `c.\t${question[0].option3}\n` : ''
    questionDisplay += question[0].option4 ? `d.\t${question[0].option4}\n` : ''

    convo.addQuestion({
        text: async (template, vars) => {
            return questionDisplay
        }
    },
        [
            {
                pattern: 'a|b|c|d',
                handler: async (response, convo) => {

                    if (response == question[0].answer) {
                        score++
                        // console.log(score)
                        await convo.gotoThread('quiz1')
                    }
                    else {
                        await convo.gotoThread('quiz1');
                    }
                }
            },
            {
                default: true,
                handler: async (response, convo) => {
                    await convo.gotoThread('wrong_answer');
                }
            }
        ], {}, 'quiz');

    // question 2

    let questionDisplay1 = ''
    questionDisplay1 += `2.\t${question[1].question}\n`
    questionDisplay1 += `-------------------------------------------------------\n`
    questionDisplay1 += `a.\t${question[1].option1}\n`
    questionDisplay1 += `b.\t${question[1].option2}\n`
    questionDisplay1 += question[1].option3 ? `c.\t${question[1].option3}\n` : ''
    questionDisplay1 += question[1].option4 ? `d.\t${question[1].option4}\n` : ''

    convo.addQuestion({
        text: async (template, vars) => {
            return questionDisplay1
        }
    },
        [
            {
                pattern: 'a|b|c|d',
                handler: async (response, convo) => {

                    if (response == question[1].answer) {
                        score++
                        // console.log(score)
                        await convo.gotoThread('quiz2')
                    }
                    else {
                        await convo.gotoThread('quiz2');
                    }
                }
            },
            {
                default: true,
                handler: async (response, convo) => {
                    await convo.gotoThread('wrong_answer1');
                }
            }
        ], {}, 'quiz1');

    // question 3

    let questionDisplay2 = ''
    questionDisplay2 += `3.\t${question[2].question}\n`
    questionDisplay2 += `-------------------------------------------------------\n`
    questionDisplay2 += `a.\t${question[2].option1}\n`
    questionDisplay2 += `b.\t${question[2].option2}\n`
    questionDisplay2 += question[2].option3 ? `c.\t${question[2].option3}\n` : ''
    questionDisplay2 += question[2].option4 ? `d.\t${question[2].option4}\n` : ''

    convo.addQuestion({
        text: async (template, vars) => {
            return questionDisplay2
        }
    },
        [
            {
                pattern: 'a|b|c|d',
                handler: async (response, convo) => {

                    if (response == question[2].answer) {
                        score++
                        // console.log(score)
                        await convo.gotoThread('quiz3')
                    }
                    else {
                        await convo.gotoThread('quiz3');
                    }
                }
            },
            {
                default: true,
                handler: async (response, convo) => {
                    await convo.gotoThread('wrong_answer2');
                }
            }
        ], {}, 'quiz2');

    // question 4

    let questionDisplay3 = ''
    questionDisplay3 += `4.\t${question[3].question}\n`
    questionDisplay3 += `-------------------------------------------------------\n`
    questionDisplay3 += `a.\t${question[3].option1}\n`
    questionDisplay3 += `b.\t${question[3].option2}\n`
    questionDisplay3 += question[3].option3 ? `c.\t${question[3].option3}\n` : ''
    questionDisplay3 += question[3].option4 ? `d.\t${question[3].option4}\n` : ''

    convo.addQuestion({
        text: async (template, vars) => {
            return questionDisplay3
        }
    },
        [
            {
                pattern: 'a|b|c|d',
                handler: async (response, convo) => {

                    if (response == question[3].answer) {
                        score++
                        // console.log(score)
                        await convo.gotoThread('quiz4')
                    }
                    else {
                        await convo.gotoThread('quiz4');
                    }
                }
            },
            {
                default: true,
                handler: async (response, convo) => {
                    await convo.gotoThread('wrong_answer3');
                }
            }
        ], {}, 'quiz3');

    // question 5

    let questionDisplay4 = ''
    questionDisplay4 += `5.\t${question[4].question}\n`
    questionDisplay4 += `-------------------------------------------------------\n`
    questionDisplay4 += `a.\t${question[4].option1}\n`
    questionDisplay4 += `b.\t${question[4].option2}\n`
    questionDisplay4 += question[4].option3 ? `c.\t${question[4].option3}\n` : ''
    questionDisplay4 += question[4].option4 ? `d.\t${question[4].option4}\n` : ''

    convo.addQuestion({
        text: async (template, vars) => {
            return questionDisplay4
        }
    },
        [
            {
                pattern: 'a|b|c|d',
                handler: async (response, convo) => {

                    if (response == question[4].answer) {
                        score++
                        // console.log(score)
                        await convo.gotoThread('success')
                    }
                    else {
                        await convo.gotoThread('success');
                    }
                }
            },
            {
                default: true,
                handler: async (response, convo) => {
                    await convo.gotoThread('wrong_answer4');
                }
            }
        ], {}, 'quiz4');

    // Thread: quiz - success
    convo.addMessage('Congratulations!', 'success');
    convo.after(async (results, bot) => {
        bot.say('You have scored ' + score + ' out of 5!')

        // handle results.name, results.age, results.color

    });

    // Thread: quiz - missed
    // convo.addMessage( 'Time elapsed! you missed it, sorry.', 'missed' ); //TODO

    // Thread: quiz - wrong answer
    convo.addMessage({
        text: 'Please enter either a, b, c or d!',
        action: 'quiz', // goes back to the thread's current state, where the question is not answered
    }, 'wrong_answer');

    convo.addMessage({
        text: 'Please enter either a, b, c or d!',
        action: 'quiz1', // goes back to the thread's current state, where the question is not answered
    }, 'wrong_answer1');

    convo.addMessage({
        text: 'Please enter either a, b, c or d!',
        action: 'quiz2', // goes back to the thread's current state, where the question is not answered
    }, 'wrong_answer2');

    convo.addMessage({
        text: 'Please enter either a, b, c or d!',
        action: 'quiz3', // goes back to the thread's current state, where the question is not answered
    }, 'wrong_answer3');

    convo.addMessage({
        text: 'Sorry, wrong answer. Try again!',
        action: 'quiz4', // goes back to the thread's current state, where the question is not answered
    }, 'wrong_answer4');
}

module.exports = questionConvo