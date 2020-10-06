

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
    return Genres
}