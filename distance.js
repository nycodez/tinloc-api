const dotenv = require('dotenv').config()
const request = require('request')
const dayjs = require('dayjs')
const { Match,Distance,Sequelize } = require('./middleware/sequelize')
const Op = Sequelize.Op

let xAuthToken = dotenv.parsed.X_AUTH_TOKEN
let apiBaseUrl = dotenv.parsed.API_BASE_URL
let airportCode = dotenv.parsed.AIRPORT_CODE
let fuzzyKm = dotenv.parsed.FUZZY_DISTANCE_KM
let fuzzyMi = dotenv.parsed.FUZZY_DISTANCE_MI
let url = apiBaseUrl +"/user/"

    Match.findAll({
    where: {
        id: { [Op.notIn]: Sequelize.literal("( SELECT match_id FROM `distances` WHERE `origin_code` = '"+ airportCode +"' )" ) },
        distance_verified_city: null
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

                let newDistance = {
                    match_id: match.id,
                    person_id: match.person_id,
                    created_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    origin_code: airportCode,
                }

                let wherePerson = {
                    where: {
                        person_id: match.person_id
                    }
                }
                let newCity = {
                    distance_verified_city: airportCode
                }

                if(parsed.results.distance_mi > 0) {
                    newDistance.distance_mi = parsed.results.distance_mi
                    if(parsed.results.distance_mi <= fuzzyMi) {
                        Match.update(newCity, wherePerson)
                    }
                }
                else if(parsed.results.distance_km > 0) {
                    newDistance.distance_km = parsed.results.distance_km
                    if(parsed.results.distance_km <= fuzzyKm) {
                        Match.update(newCity, wherePerson)
                    }
                }

                Distance.create(newDistance)
                // .then( userResponse2 => {
                //     console.log( userResponse2 )
                // })
                // .catch( error2 => {
                //     console.log( error2.code )
                // })
            })

            // await new Promise(resolve => setTimeout(resolve, 3000));
        })

    })
    .catch( error => {
        // console.log( error )
    })

// process.exit()