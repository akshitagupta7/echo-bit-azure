// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { ActivityHandler } = require('request');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await context.sendActivity(`You said '${ context.activity.text }'`);
            await context.sendActivity(context.activity.text.split('').reverse().join('')); //reverses the input text
            let apiKey = 'eba58ae1bbdbe2e6e5e7566a7e39436f';
            let city = context.activity.text;
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

        // request(url, function (err, response, body) {
        //     let weather=JSON.parse(body);
        //    await context.sendActivity(weather.main.temp);
        // }); 
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
