module.exports = (Sequelize, type) => {
    return Sequelize.define('picture', {
        id: {
            type: type.STRING(60),
            primaryKey: true,
        },
        person_id: {
            type: type.STRING(60),
        },
        name: {
            type: type.STRING(255),
        },
        url: {
            type: type.STRING(255),
        },
        last_update_time: {
            type: type.DATE,
            allowNull: true,
        },
    }, {
        type,
        timestamps: false,
        modelName: 'Picture',
        tableName: 'pictures',
    })
}
