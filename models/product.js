module.exports = function (orm, db) {
    db.define('product', {
        product_id: {type: 'number',key : true, autoPK: true},
        cat_id: {type: 'number'},
        create_time: {type: 'number'},
        price: {type: 'number'},
        name: {type: 'text'},
        image: {type: 'text'},
        size: {type: 'number'},
        description: {type: 'text'},
        code: {type: 'text'}
    });
};
