module.exports = function (orm, db) {
    db.define('promotion', {
        promotion_id: {type: 'number',key : true, autoPK: true},
        title: {type: 'text'},
        description: {type: 'text'},
        effective_date: {type: 'number'},
        expired_date: {type: 'number'},
        image: {type: 'text'},
        seen_flag: {type:'text'},
        user_id: {type:'number'}
    });
};
