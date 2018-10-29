module.exports = function (orm, db) {
    db.define('category', {
        cat_id: {type: 'number',key : true, autoPK: true},
        cat_name: {type: 'text'},
        image: {type: 'text'}
    });
};
