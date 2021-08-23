const HTTPStatus = require('http-status')
const { db } = require('integrations/sequelize')
const { getJoined, create, login, join } = require('modules/Contact/controllers')

const handler = {}

handler.getJoined = async (req, res, next) => {
  try {
    res
      .status(HTTPStatus.OK)
      .json(await getJoined({ id: req.params.id, db }))
  } catch (err) {
    return next(err)
  }
}

handler.create = async (req, res, next) => {
  try {
    res
      .status(HTTPStatus.CREATED)
      .json(await create({ data: req.body, db }))
  } catch (err) {
    return next(err)
  }
}

handler.login = async (req, res, next) => {
  try {
    res
      .status(HTTPStatus.OK)
      .json(await login({ data: req.body, db }))
  } catch (err) {
    return next(err)
  }
}

handler.join = async (req, res, next) => {
  try {
    const data = { id_contact_origin: req.params.id_origin, id_contact_destination: req.params.id_destination }
    res
      .status(HTTPStatus.OK)
      .json(await join({ data, db }))
  } catch (err) {
    return next(err)
  }
}

module.exports = handler
