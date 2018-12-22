module.exports = function (orm, db) {
    db.define('user', {
        user_id: {type: 'number',key : true, autoIncrement: true,},
        email: {type: 'text'},
        dob: {type: 'number'},
        phone: {type: 'text'},
        firstname: {type: 'text'},
        lastname: {type: 'text'},
        create_time: {type: 'number'},
        password: {type: 'text'},
        type_id: {type: 'number'},
        image: {type: 'text'},
        address: {type: 'text'},
        bank_account: {type: 'text'},
        bank_address: {type: 'text'},
        bank: {type: 'text'}
    });
};
