module.exports = function (orm, db) {
    db.define('discount', {
        product_id: {type: 'number',key : true, autoPK: true},
        effective_date: {type: 'number'},
        expired_date: {type: 'number'},
        disct_price: {type: 'number'}
    });
};
