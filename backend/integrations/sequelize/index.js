const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('./config')

const db = {}

config.logging = (sql) => {
//  console.log(sql)
}

db.sequelize = new Sequelize(config.database, config.username, config.password, config)
db.Sequelize = Sequelize

const importModel = (modelPath) => {
  const basename = path.basename(modelPath)
  fs
    .readdirSync(modelPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const modelDir = `${modelPath}/${file}`
      const model = require(modelDir)(db.sequelize, db.Sequelize.DataTypes)
      db[model.name] = model
    })
}

const associate = () => {
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })
}

module.exports = { db, importModel, associate }
