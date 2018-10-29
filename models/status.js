module.exports = function (orm, db) {
    db.define('status', {
        status_id: {type: 'number',key : true, autoPK: true},
        description: {type: 'text'}
    });
};
