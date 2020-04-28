module.exports = (Sequelize, type) => {
    return Sequelize.define('distance', {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
        },
        match_id: {
            type: type.STRING(60),
        },
        person_id: {
            type: type.STRING(60),
        },
        created_date: {
            type: type.DATE,
        },
        origin_code: {
            type: type.STRING(3),
            allowNull: true
        },
        distance_km: {
            type: type.STRING(255),
            allowNull: true
        },
        distance_mi: {
            type: type.STRING(255),
            allowNull: true
        },
        possible_cities: {
            type: type.TEXT(),
            allowNull: true
        },
        verified_city: {
            type: type.STRING(50),
            allowNull: true
        },
    }, {
        type,
        timestamps: false,
        modelName: 'Distance',
        tableName: 'distances',
    })
}
