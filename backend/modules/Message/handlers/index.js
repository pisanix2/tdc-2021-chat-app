const HTTPStatus = require('http-status')
const { db } = require('integrations/sequelize')
const { create, createByRoom, getByRoom } = require('modules/Message/controllers')

const handler = {}

handler.create = async (req, res, next) => {
  try {
    const data = req.body
    res
      .status(HTTPStatus.OK)
      .json(await create({ data, db }))
  } catch (err) {
    return next(err)
  }
}

handler.getByRoom = async (req, res, next) => {
  try {
    const { room } = req.params
    res
      .status(HTTPStatus.OK)
      .json(await getByRoom({ room, db }))
  } catch (err) {
    return next(err)
  }
}

handler.createByRoom = async ({ data }) => {
  try {
    await createByRoom({ db, data })
  } catch (err) {

  }
}

module.exports = handler
