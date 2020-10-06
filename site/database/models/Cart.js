

module.exports=(sequelize,dataTypes)=>{
    let alias = "cart"

    let cols ={
        id:{
            type : dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        cantidad : {
            type: dataTypes.INTEGER(100),
            allowNull:false
        },
    
    }
    let config = {
        tableName: "cart",
        timestamps : false,
        underscored : true
    } 
    const Cart = sequelize.define(alias,cols,config);
    return Cart;
}