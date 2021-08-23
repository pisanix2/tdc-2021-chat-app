module.exports = (sequelize, DataTypes) => {
  const _model = sequelize.define('Contact', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { paranoid: true, tableName: 'tdc_contact' })

  _model.associate = function (models) {
    
  }

  return _model
}
