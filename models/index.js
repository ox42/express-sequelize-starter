var _ = require('lodash');

var fs = require('fs');
var path = require('path');
var config = require('config');
var Sequelize = require('sequelize');

var basename = path.basename(module.filename);
var environment = config.environment;

var db = {};
var sequelize = new Sequelize(_.assign(config[environment],
    (config.environment !== 'production' ? { logging: console.log } : {})));

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {

    if (db[modelName].options.classMethods && db[modelName].options.classMethods.associate) {
        db[modelName].options.classMethods.associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
