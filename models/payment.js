module.exports = function (orm, db) {
    db.define('payment', {
        payment_id: {type: 'number',key : true, autoPK: true},
        user_id: {type: 'number'},
        sum: {type: 'number'},
        status_id: {type: 'number'},
        create_time: {type: 'number'},
        title: {type:'text'},
        pay_type: {type:'text'},
        promotion: {type: 'number'},
        total: {type: 'number'},
        seen_flag: {type:'text'},
        address: {type: 'text'}
    });
};
