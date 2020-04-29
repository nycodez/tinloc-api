module.exports = (Sequelize, type) => {
    return Sequelize.define('message', {
        id: {
            type: type.STRING(60),
            primaryKey: true,
        },
        match_id: {
            type: type.STRING(60),
        },
        sent_date: {
            type: type.DATE(),
        },
        message: {
            type: type.TEXT(),
        },
        to: {
            type: type.STRING(60),
        },
        from: {
            type: type.STRING(60),
        },
        created_date: {
            type: type.DATE(),
        },
        timestamp: {
            type: type.INTEGER(10),
        },
        is_liked: {
            type: type.BOOLEAN(),
            allowNull: true
        },
    }, {
        type,
        timestamps: false,
        modelName: 'Message',
        tableName: 'messages',
    })
}
