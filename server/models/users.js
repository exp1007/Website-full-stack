const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: sequelize.literal('uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
};