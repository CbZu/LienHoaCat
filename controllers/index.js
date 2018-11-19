var dateFormat = require('dateformat');
module.exports.home = function(req, res){
    var con = req.db.driver.db;
    sql = 'select\n' +
        'GROUP_CONCAT(c.cat_id SEPARATOR \'; \') as cat_ids,\n' +
        'GROUP_CONCAT(c.folder_id SEPARATOR \'; \') as folder_ids,\n' +
        'GROUP_CONCAT(c.cat_name SEPARATOR \'; \') as cat_names,\n' +
        '(select folder_name from treefolder where folder_id = c.folder_id) as folder_name from category  c group by folder_name order by folder_id asc;\n'
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        req.session.treefolder = rows;
        data={title:'login|signup', result:rows,fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder};
        res.render('index',data);
    });


};
