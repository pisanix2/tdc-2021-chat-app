module.exports = (sequelize, DataTypes) => {
  const _model = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_contact_origin: {
      type: DataTypes.STRING
    },
    id_contact_destination: {
      type: DataTypes.STRING
    }
  }, { paranoid: true, tableName: 'tdc_message' })

  _model.associate = function (models) {
    models.Message.hasOne(models.Contact, { as: 'ContactOrigin', foreignKey: 'id_contact_origin' })
    models.Message.hasOne(models.Contact, { as: 'ContactDestination', foreignKey: 'id_contact_destination' })
  }

  return _model
}
