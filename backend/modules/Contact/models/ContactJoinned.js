module.exports = (sequelize, DataTypes) => {
  const _model = sequelize.define('ContactJoined', {
    id_contact_origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_contact_destination: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { paranoid: true, tableName: 'tdc_contact_joined' })

  _model.associate = function (models) {
    models.ContactJoined.belongsTo(models.Contact, { as: 'ContactOrigin', foreignKey: 'id_contact_origin' })
    models.ContactJoined.belongsTo(models.Contact, { as: 'ContactDestination', foreignKey: 'id_contact_destination' })
  }

  return _model
}
