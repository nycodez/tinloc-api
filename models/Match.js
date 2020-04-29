module.exports = (Sequelize, type) => {
    return Sequelize.define('match', {
        id: {
            type: type.STRING(60),
            primaryKey: true,
        },
        closed: {
            type: type.BOOLEAN,
        },
        common_friend_count: {
            type: type.INTEGER(1),
            allowNull: true
        },
        common_like_count: {
            type: type.INTEGER(1),
            allowNull: true
        },
        created_date: {
            type: type.DATE(),
            allowNull: false
        },
        dead: {
            type: type.BOOLEAN(),
        },
        last_activity_date: {
            type: type.DATE(),
        },
        message_count: {
            type: type.INTEGER(3),
        },
        muted: {
            type: type.BOOLEAN(),
        },
        pending: {
            type: type.BOOLEAN(),
        },
        super_liker: {
            type: type.STRING(60),
            allowNull: true,
        },
        is_super_like: {
            type: type.BOOLEAN(),
        },
        is_boost_match: {
            type: type.BOOLEAN(),
        },
        is_super_boost_match: {
            type: type.BOOLEAN(),
        },
        is_experiences_match: {
            type: type.BOOLEAN(),
        },
        is_fast_match: {
            type: type.BOOLEAN(),
        },
        is_opener: {
            type: type.BOOLEAN(),
        },
        following: {
            type: type.BOOLEAN(),
        },
        following_moments: {
            type: type.BOOLEAN(),
        },
        has_harassing_feedback: {
            type: type.BOOLEAN(),
        },
        person_id: {
            type: type.STRING(60),
        },
        person_bio: {
            type: type.TEXT(),
        },
        person_birth_date: {
            type: type.DATE(),
        },
        person_name: {
            type: type.STRING(50),
        },
        distance_verified_city: {
            type: type.STRING(50),
            allowNull: true
        },
        last_updated_date: {
            type: type.DATE(),
            allowNull: true
        },
    }, {
        type,
        timestamps: false,
        modelName: 'Match',
        tableName: 'matches',
    })
}
