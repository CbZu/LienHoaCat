module.exports = function (orm, db) {
    db.define('voucher', {
        voucher_id: {type: 'number',key : true, autoPK: true},
        code: {type: 'text'},
        percent: {type: 'number'},
        effective_date: {type: 'number'},
        expired_date: {type: 'number'},
        amount: {type: 'number'},
        min: {type: 'number'},
        name: {type: 'text'},

    });
};
