module.exports = function (orm, db) {
    db.define('description', {
        description_id: {type: 'number',key : true, autoPK: true},
        description: {type: 'text'}
    });
};
