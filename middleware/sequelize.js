const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
const MatchModel = require('../models/Match')
const PictureModel = require('../models/Picture')
const DistanceModel = require('../models/Distance')
const MessageModel = require('../models/Message')

const sequelize = new Sequelize(
    dotenv.parsed.MYSQL_NAME,
    dotenv.parsed.MYSQL_USER,
    dotenv.parsed.MYSQL_PASS,
    {
        host: dotenv.parsed.MYSQL_HOST,
        dialect: 'mariadb',
        dialectOptions: {
            timezone: dotenv.parsed.MYSQL_TIMEZONE
        },
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const Match = MatchModel(sequelize, Sequelize)
const Picture = PictureModel(sequelize, Sequelize)
const Distance = DistanceModel(sequelize, Sequelize)
const Message = MessageModel(sequelize, Sequelize)

module.exports = {
    Match,
    Picture,
    Distance,
    Message,
    Sequelize
}
