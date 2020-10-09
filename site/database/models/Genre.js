

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
        tableName: "genre",
        timestamps : false,
        underscored : true
    } 
    const Genres = sequelize.define(alias,cols,config);

    Genres.associate = function(models){
        Genres.hasMany(models.products, {
            as:"productos",
            foreignKey: "id_genre"
        });
    }

    return Genres
}