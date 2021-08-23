const router = require('express').Router()
const { importModel } = require('integrations/sequelize')
const { getJoined, create, join } = require('modules/Contact/handlers')

importModel(`${__dirname}/models`)

router.post('/:id_origin/joined/:id_destination', join)
router.get('/:id/joined', getJoined)
router.post('/', create)

module.exports = { router }

