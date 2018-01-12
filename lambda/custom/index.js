/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Gordon';
const GET_FACT_MESSAGE = "Here's one great Mac and Cheese recipe. ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

var currentStep = 0;

const macAndCheese = [
    'Cook macaroni according to the package directions. Drain.',
    'In a saucepan, melt butter or margarine over medium heat.',
    'Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. ',
    'Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. ',
    'Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well.',
    'Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown.',
    'Spread over the macaroni and cheese to cover. Sprinkle with a little paprika.',
    'Bake at 350 degrees F 175 degrees C for 30 minutes. Serve.'
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        currentStep = 0;
        this.emit('CurrentStep');
    },
    'CurrentStep': function () {
        const factArr = macAndCheese;
        const step = factArr[currentStep];
        const speechOutput = GET_FACT_MESSAGE + step;

        this.response.cardRenderer(SKILL_NAME, step);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'NextStep': function () {
        const factArr = macAndCheese;
        currentStep = currentStep + 1;
        const step = factArr[currentStep];
        const speechOutput = step;
        this.response.cardRenderer(SKILL_NAME, step);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'PreviousStep': function () {
        const factArr = macAndCheese;
        currentStep = currentStep - 1;
        const step = factArr[currentStep];
        const speechOutput = step;
        this.response.cardRenderer(SKILL_NAME, step);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
