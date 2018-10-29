module.exports = function (orm, db) {
    db.define('notification', {
        notification_id: {type: 'number',key : true, autoPK: true},
        title: {type: 'text'},
        description: {type: 'text'},
        create_time: {type: 'number'},
        image: {type: 'text'},
        user_id: {type: 'number'},
        seen_flag: {type:'text'}
    });
};
