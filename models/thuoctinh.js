module.exports = function (orm, db) {
    db.define('thuoctinh', {
        product_id: {type: 'number'},
        mau: {type: 'text'},
        tuoi: {type: 'text'},
        menh: {type: 'text'}
    });
};
