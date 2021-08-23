const router = require('express').Router()
const { importModel } = require('integrations/sequelize')
const { create, createByRoom, getByRoom } = require('modules/Message/handlers')
const callback = {}

importModel(`${__dirname}/models`)

router.post('/', create)
router.get('/:room', getByRoom)
callback.createByRoom = createByRoom

module.exports = { router, callback }

