const dotenv = require('dotenv').config()
const request = require('request')
const dayjs = require('dayjs')
const { Match,Picture } = require('./middleware/sequelize')
const argv = require('minimist')(process.argv.slice(2));

let messageCount = 1
if(argv.hasOwnProperty('m')){
    messageCount = argv.m
}

let matchCount = 75
if(argv.hasOwnProperty('n')){
    matchCount = argv.n
}

let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
let url = apiBaseUrl +"/v2/matches?count="+ matchCount +"&message="+ messageCount

if(argv.hasOwnProperty('t')){
    url = url + "&page_token="+ argv.t
}

let options = {
    'method': 'GET',
    'url': url,
    'headers': {
        'x-auth-token': xAuthToken
    }
}

request(options, (error, response) => {
    if (error) throw new Error(error);
    let parsed = JSON.parse(response.body)
    let matches = parsed.data.matches

    Object.keys(matches).forEach(async (key) => {
        let match = matches[key]

        let newMatch = {
            id: match.id,
            closed: match.closed,
            common_friend_count: match.common_friend_count,
            common_like_count: match.common_like_count,
            created_date: dayjs(match.created_date).format('YYYY-MM-DD HH:mm:ss'),
            dead: match.dead,
            last_activity_date: dayjs(match.last_activity_date).format('YYYY-MM-DD HH:mm:ss'),
            message_count: messageCount,
            muted: match.muted,
            pending: match.pending,
            is_super_like: match.is_super_like,
            is_boost_match: match.is_boost_match,
            is_super_boost_match: match.is_super_boost_match,
            is_experiences_match: match.is_experiences_match,
            is_fast_match: match.is_fast_match,
            is_opener: match.is_opener,
            person_id: match.person._id,
            person_bio: match.person.bio,
            person_birth_date: match.person.birth_date,
            person_name: match.person.name,
            following: match.following,
            following_moments: match.following_moments,
            has_harassing_feedback: match.has_harassing_feedback,
            last_updated_date: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        let test = await Match.create(newMatch)
            // .then( userResponse2 => {
            //     console.log( userResponse2 )
            // })
            // .catch( error2 => {
            //     console.log( error2.code )
            // })

        let pics = match.person.photos

        Object.keys(pics).forEach(function(key2) {
            let pic = pics[key2]
            let newPic = {
                id: pic.id,
                person_id: match.person._id,
                name: pic.fileName,
                url: pic.url,
                last_update_time: pic.last_update_time,
            }
            Picture.upsert(newPic)
        })
    })

    if(parsed.data.hasOwnProperty('next_page_token')){
        console.log("next page token: " + parsed.data.next_page_token)
    }
    process.exit()
})


