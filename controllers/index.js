var dateFormat = require('dateformat');
module.exports.home = function(req, res){

    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var sql = '';


    var con = req.db.driver.db;
    sql = 'select image, \n' +
        'GROUP_CONCAT(c.cat_id SEPARATOR \'; \') as cat_ids,\n' +
        'GROUP_CONCAT(c.folder_id SEPARATOR \'; \') as folder_ids,\n' +
        'GROUP_CONCAT(c.cat_name SEPARATOR \'; \') as cat_names,\n' +
        '(select folder_name from treefolder t where t.folder_id = c.folder_id ) as folder_name,' +
        '(select t.index from treefolder t where t.folder_id = c.folder_id ) as folder_index from category  c group by folder_name order by folder_index asc;\n'
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        req.session.treefolder = rows;

        sql = 'select  name, validFlag, p.product_id,cat_id,image, \n' +
            '(select cat_name from category where cat_id = p.cat_id) as cat_name ,\n' +
            '(select description from description where p.description = description_id) as description ,\n' +
            '(select MIN(disct_price) from discount where product_id = p.product_id and effective_date <= '+year+''+month+''+day+' and '+year+''+month+''+day+'<=expired_date) as disct_prices ,\n' +
            '(select MIN(price) from product where name = p.name) as prices ,\n' +
            '(select GROUP_CONCAT(size SEPARATOR \',\') from product where name = p.name) as sizes ,\n' +
            '(select GROUP_CONCAT(product_id SEPARATOR \',\') from product where name = p.name) as size_id ,\n' +
            '(select url from image where product_id = p.product_id and type = 1 limit 1) as image, \n' +
            '(select \'Y\') as new \n'+
            'from product p join thuoctinh t on p.product_id = t.product_id join description d on p.description = d.description_id where (('+year+month+day+' - p.create_time)/(24*3600*1000) ) < 30 ';
        if (req.session.type == 1){
            sql = sql + 'group by name order by p.product_id LIMIT 12;'
        } else{
            sql = sql + 'and p.validFlag = \'1\' group by name order by p.product_id LIMIT 12;'
        }
        con.query(sql, function (err, row1s) {
            sql = 'select title,image from promotion where effective_date <= '+year+''+month+''+day+' and '+year+''+month+''+day+'<=expired_date';
            con.query(sql, function (err, row2s) {
                data={title:'login|signup', result:row1s,fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder,promotions:row2s};
                res.render('index',data);
            });

        });

    });


};
