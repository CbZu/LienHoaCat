module.exports = function (orm, db) {
    db.define('size', {
        product_id: {type: 'number',key : true, autoPK: true},
        create_time: {type: 'number'},
        price: {type: 'number'},
        size: {type: 'number'},
        code: {type: 'text'},
        disct_price: {type: 'number'}
    });
};
