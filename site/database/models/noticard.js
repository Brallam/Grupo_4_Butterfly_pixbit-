module.exports=(sequelize,dataTypes)=>{
    let alias = "noticiacarta"

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
        descripcion:{
            type: dataTypes.STRING(300),
            allowNull:false
        },
        image:{
            type: dataTypes.STRING(200),
            allowNull:false
        },
        ref:{
            type: dataTypes.STRING(11),
            allowNull:true
        },
    }
    let config = {
        tableName: "noticiacarta",
        timestamps : false,
        underscored : true
    } 
    const noticiacarta = sequelize.define(alias,cols,config);
    return noticiacarta;
}