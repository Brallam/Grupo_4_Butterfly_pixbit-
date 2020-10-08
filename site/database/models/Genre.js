

module.exports=(sequelize,dataTypes)=>{
    let alias = "Genres"

    let cols ={
        id:{
            type : dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        gname : {
            type: dataTypes.STRING(100),
            allowNull:false
        },

    }
    let config = {
        tableName: "genres",
        timestamps : false,
        underscored : true
    } 
    const Genres = sequelize.define(alias,cols,config);

    /*Genres.associate = function(models){
        Genres.belongsToMany(models.products, {
            as:"productos",
            through: "products_has_genre",
            foreignKey: "genre_id",
            otherKey: "products_id",
            timestamps : false
        });
    }*/

    return Genres
}