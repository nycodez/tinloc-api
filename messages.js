const dotenv = require('dotenv').config()
const request = require('request')
const dayjs = require('dayjs')
const { Match,Message,Sequelize } = require('./middleware/sequelize')

let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
const argv = require('minimist')(process.argv.slice(2));


if(!argv.hasOwnProperty('m')){
    console.log('requires -m matchId')
    return
}

let messageCount = 200
if(argv.hasOwnProperty('n')){
    messageCount = argv.n
}

let url = apiBaseUrl +"/v2/matches/"+ argv.m +"/messages?count="+ messageCount
let options = {
    'method': 'GET',
    'url': url,
    'headers': {
        'x-auth-token': xAuthToken
    }
}
if(argv.hasOwnProperty('t')){
    url = url + "&page_token="+ argv.t
}
request(options,function(error, response) {
    if (error) throw new Error(error);
    let parsed = JSON.parse(response.body)

    if (parsed.data.hasOwnProperty('next_page_token')) {
        console.log("next page token: " + parsed.data.next_page_token)
    }

    Object.keys(parsed.data.messages).forEach(async function (key) {
        let newMessage = parsed.data.messages[key]

        newMessage.sent_date = dayjs(newMessage.sent_date).format('YYYY-MM-DD HH:mm:ss')
        newMessage.created_date = dayjs(newMessage.created_date).format('YYYY-MM-DD HH:mm:ss')
        newMessage['id'] = newMessage['_id'];

        Message.upsert(newMessage)
    })
})

Message.count({
    where: {
        match_id: argv.m
    },
}).then(messageCount => {
    let newMatch = {
        message_count: messageCount,
        last_updated_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    let whereMatch = {
        where: {
            id: argv.m
        }
    }
    Match.update(newMatch, whereMatch)
})

