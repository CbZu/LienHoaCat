module.exports = function (orm, db) {
    db.define('category', {
        cat_id: {type: 'number',key : true, autoPK: true},
        folder_id: {type: 'number'},
        cat_name: {type: 'text'},
        image: {type: 'text'}
    });
};
