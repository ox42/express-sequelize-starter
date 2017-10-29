var hasha = require('hasha');
var config = require('config');

module.exports = {
    up: (queryInterface, Sequelize) => {

        var account = {
            firstName: 'John',
            lastName: 'Smith',

            email: 'admin@express.org',

            createdAt: new Date(),
            updatedAt: new Date()
        };

        var passwordMD5 = hasha('secret', {algorithm: 'md5'});
        let encryptedPassword = hasha(config.HASHA_SECRET_SALT + passwordMD5);
        account.password = encryptedPassword;

        return queryInterface.bulkInsert('Accounts', [
            account,
            /* other rows you want to add to "Accounts" */
        ]);
    }
};
