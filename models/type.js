module.exports = function (orm, db) {
    db.define('type', {
        type_id: {type: 'number',key : true, autoPK: true},
        description: {type: 'text'}
    });
};
