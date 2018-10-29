module.exports = function (orm, db) {
    db.define('wishlist', {
        user_id: {type: 'number'},
        product_id: {type: 'number'},
        amount: {type: 'number'},
        create_time: {type: 'number'},
        status_id: {type: 'number'},
        disct_price: {type: 'number'},
        price: {type: 'number'}
    });
};
