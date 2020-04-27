const dotenv = require('dotenv').config()
const http = require('http')
const request = require('request')
const express = require('express')
const jwt = require('jwt-simple')
let app = express()
const { Match,Picture } = require('./sequelize')

let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
let url = apiBaseUrl +"/user/"


Match.findAll({
    where: {
        person_distance_mi: null,
    },
    raw : true,
    limit: 20
    })
    .then( data => {
        Object.keys(data).forEach(async function(key) {
            let match = data[key]
            let person_id = match.person_id
            let options = {
                'method': 'GET',
                'url': url + person_id,
                'headers': {
                    'x-auth-token': xAuthToken
                }
            }

            await request(options,  function (error, response) {
                if (error) throw new Error(error);
                let parsed = JSON.parse(response.body)
                let distance = 0

                if(parsed.results.distance_mi > 0)
                    distance = parsed.results.distance_mi
                else
                    distance = 0

                let newDistance = {
                    person_distance_mi: distance
                }
                 Match.update(newDistance, {
                    where: {
                        person_id: person_id,
                    }
                })
            })

            // await new Promise(resolve => setTimeout(resolve, 3000));
        })

    })
    .catch( error => {
        // console.log( error )
    })

// process.exit()