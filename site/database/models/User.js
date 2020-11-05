module.exports = (sequelize, dataTypes) => {
  let alias = "users";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    nameU: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    admin: {
      type: dataTypes.BOOLEAN(),
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsToMany(models.products, {
      as: "products",
      through: "cart",
      foreignKey: "id_user",
      otherKey: "id_product",
      timestamps: false,
    });
  };
  return User;
};
