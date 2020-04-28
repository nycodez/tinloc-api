const dotenv = require('dotenv').config()
const http = require('http')
const request = require('request')
const express = require('express')
const jwt = require('jwt-simple')
let app = express()
const { Match,Picture,Distance,Sequelize } = require('./middleware/sequelize')

let count = 50
let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
let url = apiBaseUrl +"/v2/matches?count="+ count +"&is_tinder_u=false&locale=en&message=1"

let page_token = ""

if(page_token.length > 0)
    url = url + "&page_token="+ page_token

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
            has_harassing_feedback: match.has_harassing_feedback
        }
        Match.upsert(newMatch)
            // .then( userResponse => {
            //     console.log( userResponse )
            // })
            // .catch( error => {
            //     console.log( error.code )
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
                // .then( userResponse2 => {
                //     console.log( userResponse2 )
                // })
                // .catch( error2 => {
                //     console.log( error2.code )
                // })

        })
    })
    return console.log("next page token: "+ parsed.data.next_page_token)
})


