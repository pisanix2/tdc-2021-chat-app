const joinedContacts = require('helpers/joined-contacts')
const controller = {}

controller.create = async ({ data, db }) => {
  const idJoined = await joinedContacts({ db, id_origin: data.id_contact_origin, id_destination: data.id_contact_destination })
  if (!idJoined) {
    throw new Error('Contact not joined')
  }

  const dataCreated = await db.Message.create(data)
  const fetchMessage = await db.Message.findByPk(dataCreated.id)
  return fetchMessage
}

module.exports = controller
