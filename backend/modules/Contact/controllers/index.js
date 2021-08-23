const joinedContacts = require('helpers/joined-contacts')
const controller = {}

controller.getJoined = async ({ id, db }) => {
  const data = await db.Contact.findAll()
  const dataCalc = []
  for (const item of data) {
    const idJoined = await joinedContacts({ db, id_origin: item.id, id_destination: id })
    if (idJoined) {
      item.dataValues.joinned = idJoined
      dataCalc.push(item)
    }
  }
  return dataCalc
}

controller.create = async ({ data, db }) => {
  const dataCreated = await db.Contact.create(data)
  const fetchContact = await db.Contact.findByPk(dataCreated.id)
  delete fetchContact.pwd
  return fetchContact
}

controller.login = async ({ data, db }) => {
  const { login, pwd } = data
  const fetchContact = await db.Contact.findOne({ where: { login, pwd } })
  delete fetchContact.pwd
  return fetchContact
}

controller.join = async ({ data, db }) => {
  const { id_contact_origin, id_contact_destination } = data

  let fetchJoinDestination = null
  const fetchJoinOrigin = await db.ContactJoined.findOne({
    where: { id_contact_origin, id_contact_destination }
  })

  if (!fetchJoinOrigin) {
    fetchJoinDestination = await db.ContactJoined.findOne({
      where: { id_contact_origin: id_contact_destination, id_contact_destination: id_contact_origin }
    })
  }

  if (fetchJoinDestination || fetchJoinOrigin) {
    throw new Error('Contact already joined')
  }

  const fetchJoined = await db.ContactJoined.create(data)
  return fetchJoined
}

module.exports = controller
