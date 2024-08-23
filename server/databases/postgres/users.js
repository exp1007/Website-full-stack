const { Sequelize } = require("./postgres");

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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        register_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    });

    return Users;
};