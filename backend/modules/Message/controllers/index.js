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

controller.getByRoom = async ({ room, db }) => {
  const fetchJoin = await db.ContactJoined.findByPk(room)
  const fetchMessage = await db.Message.findAll({
    where: { id_contact_origin: fetchJoin.id_contact_origin, id_contact_destination: fetchJoin.id_contact_destination },
    order: [['createdAt']]
  })
  return fetchMessage.map(el => ({ message: el.content, contact: el.id_contact_origin }))
}

controller.createByRoom = async ({ data, db }) => {
  const { room, message } = data
  const fetchJoin = await db.ContactJoined.findByPk(room)
  if (fetchJoin) {
    const obj = {
      content: message,
      id_contact_origin: fetchJoin.id_contact_origin,
      id_contact_destination: fetchJoin.id_contact_destination
    }
    await db.Message.create(obj)
  }
}

module.exports = controller
