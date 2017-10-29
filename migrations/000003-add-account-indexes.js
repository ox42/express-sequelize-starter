var Promise = require('bluebird');

module.exports = {
    up: (queryInterface, Sequelize) => {

        //you can use these types of commands to add indexes
        return queryInterface.addIndex('Accounts', ['email'], {
            indicesType: 'UNIQUE'
        });
    }
};
