module.exports = function (orm, db) {
    db.define('places', {
        place_id: {type: 'number',key : true, autoPK: true},
        country: {type: 'text'},
        city: {type: 'text'},
        address: {type: 'text'},
        user_id: {type: 'number'}
    });
};
