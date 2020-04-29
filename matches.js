const dotenv = require('dotenv').config()
const request = require('request')
const dayjs = require('dayjs')
const { Match,Picture,Distance,Sequelize } = require('./middleware/sequelize')
var argv = require('minimist')(process.argv.slice(2));

let matchCount = 75
if(argv.hasOwnProperty('n')){
    matchCount = argv.n
}
let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
let url = apiBaseUrl +"/v2/matches?count="+ matchCount +"&message=0"

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

request(options, function (error, response) {
    if (error) throw new Error(error);
    let parsed = JSON.parse(response.body)
    let matches = parsed.data.matches
    console.log('matches count', Object.keys(matches).length);
    let thisMatch = 1;
    Object.keys(matches).forEach(function(key) {
        let match = matches[key]
        let newMatch = {
            id: match.id,
            closed: match.closed,
            common_friend_count: match.common_friend_count,
            common_like_count: match.common_like_count,
            created_date: match.created_date,
            dead: match.dead,
            last_activity_date: match.last_activity_date,
            message_count: match.message_count,
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
            last_updated_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }
        Match.upsert(newMatch)
            // .then( userResponse => {
            //     console.log( userResponse )
            // })
            // .catch( error => {
            //     console.log( error.code )
            // })
            // .then(console.log(thisMatch +"\r\n"))

        let pics = match.person.photos
        // console.log('this match pictures count', Object.keys(pics).length);
        let thisPic = 1
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
                // .then( userResponse2 => {
                //     console.log( userResponse2 )
                // })
                // .catch( error2 => {
                //     console.log( error2.code )
                // })
                // .then(console.log(thisPic +"\r\n"))

            thisPic = thisPic + 1
        })
        thisMatch = thisMatch + 1
    })

    if(parsed.data.hasOwnProperty('next_page_token')){
        console.log("next page token: " + parsed.data.next_page_token)
    }
    process.exit()
})


