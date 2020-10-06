

module.exports=(sequelize,dataTypes)=>{
    let alias = "products"

    let cols ={
        id:{
            type : dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        name : {
            type: dataTypes.STRING(100),
            allowNull:false
        },
        genre:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        requisito:{
            type: dataTypes.STRING(500),
            allowNull:false
        },
        descripcion:{
            type: dataTypes.STRING(800),
            allowNull:false
        },
        propiedad:{
            type: dataTypes.BOOLEAN(),
            allowNull:false
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        image:{
            type: dataTypes.STRING(100),
            allowNull:false
        }

    }
    let config = {
        tableName: "products",
        timestamps : false,
        underscored : true
    } 
    const Product = sequelize.define(alias,cols,config);
    return Product;
}