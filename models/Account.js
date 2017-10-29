module.exports = function (sequelize, DataTypes) {
    const Account = sequelize.define("Account", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,

        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return Account;
};
