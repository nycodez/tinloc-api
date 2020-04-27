const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
const MatchModel = require('./models/Match')
const PictureModel = require('./models/Picture')

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
        logging: true,
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

module.exports = {
    Match,
    Picture
}
