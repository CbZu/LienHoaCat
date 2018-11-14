module.exports = function (orm, db) {
    db.define('voucher', {
        voucher_id: {type: 'number',key : true, autoPK: true},
        code: {type: 'text'},
        effective_date: {type: 'number'},
        expired_date: {type: 'number'}
    });
};
