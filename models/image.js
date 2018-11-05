module.exports = function (orm, db) {
    db.define('image', {
        product_id: {type: 'number',key : true, autoPK: true},
        url: {type: 'text'},
        type: {type: 'text'}
    });
};
