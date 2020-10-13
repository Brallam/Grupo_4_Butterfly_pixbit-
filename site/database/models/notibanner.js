module.exports=(sequelize,dataTypes)=>{
    let alias = "noticiabanner"

    let cols ={
        id:{
            type : dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        titulo : {
            type: dataTypes.STRING(45),
            allowNull:false
        },
        descrition:{
            type: dataTypes.STRING(300),
            allowNull:false
        },
        image:{
            type: dataTypes.STRING(200),
            allowNull:false
        },
        ref:{
            type: dataTypes.STRING(11),
            allowNull:false
        },
    }
    let config = {
        tableName: "noticiabanner",
        timestamps : false,
        underscored : true
    } 
    const Product = sequelize.define(alias,cols,config);
    return Product;
}