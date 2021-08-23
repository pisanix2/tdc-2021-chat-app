const HTTPStatus = require('http-status')
const { db } = require('integrations/sequelize')
const { create } = require('modules/Message/controllers')

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

module.exports = handler
