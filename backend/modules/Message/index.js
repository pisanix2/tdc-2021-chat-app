const router = require('express').Router()
const { importModel } = require('integrations/sequelize')
const { create } = require('modules/Message/handlers')

importModel(`${__dirname}/models`)

router.post('/', create)

module.exports = { router }

