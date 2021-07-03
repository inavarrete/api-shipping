module.exports = (sequelize,type) =>{
    return sequelize.define('shippings',{
        id:{
            type: type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        customer: {
            type: type.STRING(100)
        },
        descrip: {
            type: type.TEXT
        },
        status: {
            type: type.STRING(10)
        },
        origin_lat: {
            type: type.DECIMAL(11, 8)
        },
        origin_long: {
            type: type.DECIMAL(11, 8)
        },
        current_lat: {
            type: type.DECIMAL(11, 8)
        },
        current_long: {
            type: type.DECIMAL(11, 8)
        },
        end_lat: {
            type: type.DECIMAL(11, 8)
        },
        end_long: {
            type: type.DECIMAL(11, 8)
        }
    },{timestamps : false})
}