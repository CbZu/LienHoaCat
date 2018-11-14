var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var path = require('path');
/*var fs = require('fs');*/

var fs=require('fs');

//add project


module.exports.add_product = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var product_id = new Array();
    if(input.mode == 'data'){
        var data={
            cat_id:input.category_id
        };
        req.models.category.find(data,function(err,row1s) {
            if (row1s.length == 0) {
                var data = {status: 'fail', code: '200', description: "Category not found"};
                res.json(data);
            } else {
                for( var i = 0; i < input.name.length ; i++){
                    var data={
                        description : input.descriptin[i]
                    };
                    req.models.description.create(data,function(err,row2s){
                        if(err){
                            var data={status:'fail',code:'300',description:err.message};
                            res.json(data);
                        }
                        else{
                            var data={
                                cat_id:input.category_id,
                                create_time:parseInt(year+''+month+''+day),
                                name:input.name[i],
                                price:input.price[i],
                                size:input.size[i],
                                image:input.image[i],
                                code:input.code[i],
                                description : row2s.insertId
                            };
                            req.models.product.create(data,function(err,rows){
                                if(err){
                                    var data={status:'fail',code:'300',description:err.message};
                                    res.json(data);
                                }
                                else{
                                    product_id.push(rows.product_id);
                                }
                            });
                        }
                    });

                }


            }
        });
        var data={status:'success',code:'200',ids:product_id};
        res.json(data);
    } else{

    }

};
module.exports.add_category = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var formidable = require('formidable');

    var form = new formidable.IncomingForm({
        keepExtensions: true
    });


    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/data/' + file.name;

    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.parse(req);


    var data={
        cat_name:input.newCat,
        image:req.files.upfile.path.split("\\")[ req.files.upfile.path.split("\\").length-1],
        folder_id: input.newFolder
    };
    req.models.category.create(data,function(err,row1s) {
        if (err) {
            var data = {status: 'fail', code: '300', description : err.message};
            res.json(data);
        } else {
            res.json(200, {
                    path: req.files.upfile.path,
                    name:req.files.upfile.name
                }
            );
        }
    });
};

module.exports.remove = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var formidable = require('formidable');
    var i = 0;
    input.path.split(';').forEach(function (element){
        var oldpath = element;
        var newpath = __dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]);
        console.log(__dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]));
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

// Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                console.log('File written!');
            });

// Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
        i++;
    });

    var data = {status: 'success', code: '200'};
    res.json(data);

  /*  var oldpath = input.path;
    var newpath = 'F:\\Nodejs\\LienHoaCat\\public\\assets\\img\\' + input.name;
    fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.redirect('maintenance-cat');
    });*/

};
module.exports.get_product = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
        var data={

        };

        var sql = '';
        if(input.cat_id.trim()==''){
            sql += '\n' +
                'select name,product_id,cat_id, \n' +
                '(select description from description where p.description = description_id) as description ,\n' +
                '(select GROUP_CONCAT(price SEPARATOR \'; \') from product where name = p.name) as prices ,\n' +
                '(select GROUP_CONCAT(size SEPARATOR \'; \') from product where name = p.name) as sizes ,\n' +
                '(select GROUP_CONCAT(type SEPARATOR \'; \') from image where product_id = p.product_id) as image_types ,\n' +
                '(select GROUP_CONCAT(url SEPARATOR \'; \') from image where product_id = p.product_id) as images ,\n' +
                '(select GROUP_CONCAT(product_id SEPARATOR \'; \') from product where name = p.name) as size_ids \n' +
                'from product p  group by name order by product_id;';
        }else{
            sql += '\n' +
                'select name,product_id,cat_id,image, \n' +
                '(select description from description where p.description = description_id) as description ,\n' +
                '(select GROUP_CONCAT(price SEPARATOR \'; \') from product where name = p.name) as prices ,\n' +
                '(select GROUP_CONCAT(size SEPARATOR \'; \') from product where name = p.name) as sizes ,\n' +
                '(select GROUP_CONCAT(type SEPARATOR \'; \') from image where product_id = p.product_id) as image_types ,\n' +
                '(select GROUP_CONCAT(url SEPARATOR \'; \') from image where product_id = p.product_id) as images ,\n' +
                '(select GROUP_CONCAT(product_id SEPARATOR \'; \') from product where name = p.name) as size_ids \n' +
                'from product p where cat_id = '+input.cat_id+' group by name order by product_id;';
        }
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var data = {status: 'success', code: '200',result:rows};
                res.json(data);
            }

        });

};
module.exports.get_product_by_name = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var data={

    };

    var sql = '';
    if(input.name.trim()==''){
        sql += '\n' +
            'select name,product_id,cat_id, \n' +
            '(select description from description where p.description = description_id) as description ,\n' +
            '(select GROUP_CONCAT(price SEPARATOR \'; \') from product where name = p.name) as prices ,\n' +
            '(select GROUP_CONCAT(size SEPARATOR \'; \') from product where name = p.name) as sizes ,\n' +
            '(select GROUP_CONCAT(type SEPARATOR \'; \') from image where product_id = p.product_id) as image_types ,\n' +
            '(select GROUP_CONCAT(url SEPARATOR \'; \') from image where product_id = p.product_id) as images ,\n' +
            '(select GROUP_CONCAT(product_id SEPARATOR \'; \') from product where name = p.name) as size_ids \n' +
            'from product p  group by name order by product_id;';
    }else{
        sql += '\n' +
            'select name,product_id,cat_id,image, \n' +
            '(select description from description where p.description = description_id) as description ,\n' +
            '(select GROUP_CONCAT(price SEPARATOR \'; \') from product where name = p.name) as prices ,\n' +
            '(select GROUP_CONCAT(size SEPARATOR \'; \') from product where name = p.name) as sizes ,\n' +
            '(select GROUP_CONCAT(type SEPARATOR \'; \') from image where product_id = p.product_id) as image_types ,\n' +
            '(select GROUP_CONCAT(url SEPARATOR \'; \') from image where product_id = p.product_id) as images ,\n' +
            '(select GROUP_CONCAT(product_id SEPARATOR \'; \') from product where name = p.name) as size_ids \n' +
            'from product p where name like \'%'+input.name+'%\' group by name order by product_id;';
    }
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var data = {status: 'success', code: '200',result:rows};
            res.json(data);
        }

    });

};
module.exports.get_size_product = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var data={

    };

    var sql = '';
    if(input.productId.trim()==''){
        var data = {status: 'error', code: '300',description:"please enter product Id"};
        res.json(data);
    }else{
        sql += 'select size ,product_id from product where name = (select name from product where product_id = '+input.productId+')';
    }
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var data = {status: 'success', code: '200',result:rows};
            res.json(data);
        }

    });

};
module.exports.get_category = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var data={

    };

    var sql = 'select * from category ';
    if(input.name.trim()==''){
        sql += ';'
    }else{
        sql += 'where cat_name = \''+input.name +'\' ;';
    }
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var data = {status: 'success', code: '200',result:rows};
            res.json(data);
        }

    });
};
module.exports.add_to_cart = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var userid;
    if (input.userId == undefined){
        userid = req.session.user_id;
    }else{
        userid = input.userId;
    }

        var sql = 'select user_id from user where user_id = \''+userid +'\';';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{

                if(rows.length > 0){
                    var i = 0;
                    input.size_id.forEach(function(element) {
                        console.log(element);
                        userid = rows[0].user_id;
                        var getAmount = 'select * from cart where product_id = '+element+' and user_id = '+userid+' and payment_id = 0;';
                        var dataCart ={
                            product_id:element,
                            user_id:userid,
                            payment_id : 0
                        };
                        con.query(getAmount, function (err, row2s) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                if(row2s.length>0){
                                    var sqlUpdate = 'update cart set amount = '+(parseInt(input.quantity[i])+parseInt(row2s[0].amount))+' where product_id = '+element+' and user_id = '+userid+';';
                                    con.query(sqlUpdate,function(err,row1s) {
                                        if (err) {
                                            var data = {status: 'fail', code: '300', description : err.message};
                                            res.json(data);
                                        } else {

                                        }
                                    });
                                }else{
                                    var data={
                                        user_id: parseInt(userid),
                                        product_id:parseInt(element),
                                        amount:parseInt(input.quantity[i]),
                                        payment_id:0,
                                        create_time:parseInt(year+''+month+''+day),
                                        status_id:0
                                    };
                                    req.models.cart.create(data,function(err,row1s) {
                                        if (err) {
                                            var data = {status: 'fail', code: '300', description : err.message};
                                            res.json(data);
                                        } else {
                                            var updatePrice = 'update cart set disct_price = 0, price = 0' +
                                                ' where product_id = '+element+' and user_id = '+userid+' and payment_id = 0  ;';
                                            con.query(updatePrice, function (err, row4s) {
                                                if(!err){

                                                }
                                            });
                                        }
                                    });
                                }
                                i++;
                            }
                        });

                    });


                    var data = {status: 'success', code: '200'};
                    res.json(data);
                }else{
                    var data = {status: 'error', code: '300',error: "User not found!!!"};
                    res.json(data);
                }
            }

        });


};
module.exports.get_cart = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var user = '';
    if(input.user == undefined){
        user=req.session.user_id;
    }else{
        user=input.user;
    }
    var sql = 'select \n' +
        '(select name from product where c.product_id = product_id ) as name,\n' +
        'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
        'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
        'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
        'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date),0) SEPARATOR \'; \')  as discount_prices,\n' +
        'GROUP_CONCAT(\n' +
        'FORMAT(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount),\n' +
        '\t0) SEPARATOR \'; \') as sums,\n' +
        'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
        'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
        'sum(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
        'from cart c where payment_id = 0  and user_id = '+user+' group by name ;';

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{

            var data = {status: 'success', code: '200',result:rows};
            res.json(data);
            /*var sql = 'select\n' +
                'sum((select (price*c.amount) from product where c.product_id = product_id )) as total\n' +
                'from cart c where payment_id = 0  and user_id = '+input.user+';';
            con.query(sql, function (err, row1s) {
                if(!err){
                    var data = {status: 'success', code: '200',result:rows, total:row1s[0].total};
                    res.json(data);
                }
            });*/



        }

    });
};
module.exports.add_to_wishlist = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var userid;
    var sql = 'select user_id from user where user_id = \''+input.userId +'\';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{

            if(rows.length > 0){
                var i = 0;
                input.size_id.forEach(function(element) {
                    console.log(element);
                    userid = rows[0].user_id;
                    var getAmount = 'select * from wishlist where user_id = '+userid+' and product_id = '+element+' ;';
                    var dataCart ={
                        product_id:element,
                        user_id:userid
                    };
                    con.query(getAmount, function (err, row2s) {
                        if(err){
                            var data = {status: 'error', code: '300',error: err};
                            res.json(data);
                        }else{
                            if(row2s.length>0){

                            }else{
                                var data={
                                    user_id: parseInt(userid),
                                    product_id:parseInt(element),
                                    create_time:parseInt(year+''+month+''+day),
                                    status_id:0
                                };
                                req.models.wishlist.create(data,function(err,row1s) {
                                    if (err) {
                                        var data = {status: 'fail', code: '300', description : err.message};
                                        res.json(data);
                                    } else {
                                        var updatePrice = 'update wishlist set disct_price = (select disct_price from product where product_id = '+element+'), price = (select price from product where product_id = '+element+')' +
                                            ' where product_id = '+element+' and user_id = '+userid+'   ;';
                                        con.query(updatePrice, function (err, row4s) {
                                            if(!err){

                                            }
                                        });
                                    }
                                });
                            }
                            i++;
                        }
                    });

                });


                var data = {status: 'success', code: '200'};
                res.json(data);
            }else{
                var data = {status: 'error', code: '300',error: "User not found!!!"};
                res.json(data);
            }
        }

    });


};
module.exports.get_wishlist = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));

    sql = '\n' +
        'select p.name,p.product_id,p.cat_id, \n' +
        '(select description from description where p.description = description_id) as description ,\n' +
        '(select GROUP_CONCAT(price SEPARATOR \'; \') from product where name = p.name) as prices ,\n' +
        '(select GROUP_CONCAT(size SEPARATOR \'; \') from product where name = p.name) as sizes ,\n' +
        '(select GROUP_CONCAT(type SEPARATOR \'; \') from image where product_id = p.product_id) as image_types ,\n' +
        '(select GROUP_CONCAT(url SEPARATOR \'; \') from image where product_id = p.product_id) as images ,\n' +
        '(select GROUP_CONCAT(product_id SEPARATOR \'; \') from product where name = p.name) as size_ids \n' +
        'from product p join wishlist w on p.product_id = w.product_id where w.user_id = '+input.user+' group by p.name ;';

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{

            var data = {status: 'success', code: '200',result:rows};
            res.json(data);
            /*var sql = 'select\n' +
                'sum((select (price*c.amount) from product where c.product_id = product_id )) as total\n' +
                'from cart c where payment_id = 0  and user_id = '+input.user+';';
            con.query(sql, function (err, row1s) {
                if(!err){
                    var data = {status: 'success', code: '200',result:rows, total:row1s[0].total};
                    res.json(data);
                }
            });*/
        }

    });
};
module.exports.add_to_payment = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var user = '';
    if(input.user == undefined){
        user=req.session.user_id;
    }else{
        user=input.user;
    }
    var sql = 'select \n' +
        'sum(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
        'from cart c where payment_id = 0  and user_id = '+user+'  ;';
    var Sum = 0;
    var promotion = 0;
    var totalAfterPromot = 0
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            if(rows.length > 0){
                totalAfterPromot = rows[0].total;
                var sqlIns = 'INSERT INTO `lhc`.`payment`\n' +
                    '(`user_id`,\n' +
                    '`sum`,\n' +
                    '`status_id`,`create_time`,`title`,`pay_type`,`promotion`,`total`,`seen_flag`,`ship`)\n' +
                    'VALUES ('+input.user+','+Sum+',1,'+parseInt(year+''+month+''+day)+',\''+input.title+'\',\''+input.pay_type+'\','+'0'+','+totalAfterPromot+',\'N\',\''+input.ship+'\')';
                con.query(sqlIns, function (err, row1s) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        var sqlUpdate = 'update cart set payment_id = '+row1s.insertId+' where user_id = '+input.user+' and payment_id = 0;';
                        con.query(sqlUpdate, function (err, row2s) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                var data = {status: 'success', code: '200',results:rows,Sum:Sum, payment_id:row1s.insertId};
                                res.json(data);
                            }
                        });
                    }
                });

            }else{
                var data = {status: 'Empty', code: '400',description:"There is no products in cart !!!"};
                res.json(data);
            }

        }

    });
};
module.exports.get_payment_detail = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));

    var sql = 'select \n' +
        '(select name from product where c.product_id = product_id ) as name,\n' +
        'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
        'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
        'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
        'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date),0) SEPARATOR \'; \')  as disct_prices,\n' +
        'GROUP_CONCAT(\n' +
        'FORMAT(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount),\n' +
        '\t0) SEPARATOR \'; \') as sums,\n' +
        'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
        'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
        'sum(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
        'from cart c where payment_id = '+input.paymentId+'  and user_id = '+user+' group by name ;';

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var sql = 'select\n' +
                'sum((select (price*c.amount) from product where c.product_id = product_id )) as total\n' +
                'from cart c where payment_id ='+input.paymentId+';';
            con.query(sql, function (err, row1s) {
                if(!err){
                    var data = {status: 'success', code: '200',result:rows, total:row1s[0].total};
                    res.json(data);
                }
            });



        }

    });
};
module.exports.update_payment = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

    if(input.status == undefined){
        var sql = 'update payment set seen_flag = \''+input.seen+'\' where payment_id = '+input.payment_id+'; ';
    }else{
        var sql = 'update payment set status_id = '+input.status+',seen_flag = \''+input.seen_flag+'\' where payment_id = '+input.payment_id+'; ';
    }

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
       if(err){
           var data = {status: 'err', code: '300',description:err};
           res.json(data);
       } else{
           var data = {status: 'success', code: '200'};
           res.json(data);
       }
    });
}


module.exports.get_order = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var paymentId = [];
    var detail = [];
    var sql = 'select p.payment_id,title,pay_type,p.user_id,\n' +
        '(select COUNT(product_id) from cart where payment_id = p.payment_id) as products,\n' +
        'p.status_id,\n' +
        'p.promotion,\n' +
        'p.sum as total_before_promote,\n' +
        'p.total as total_after_promote,\n' +
        '(select concat(SUBSTRING(p.create_time, 7, 2),\'/\',SUBSTRING(p.create_time, 5, 2),\'/\',SUBSTRING(p.create_time, 1, 4))) as date \n' +
        'from payment p where ';
    var where = 'user_id = '+input.user+' ';
    if(input.status.trim() != ''){
       where += ' AND status_id = '+input.status+'';
    }
    if(input.seen.trim() != ''){
        where += ' AND seen_flag = \''+input.seen+'\'';
    }
    sql += where +' ;';
    var con = req.db.driver.db;
    if(input.seen.trim() == ''){
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                sql = 'update payment set seen_flag = \'Y\' where user_id = '+input.user+';'
                var con = req.db.driver.db;
                con.query(sql, function (err, row1s) {
                    if(err){
                        var data = {status: 'err', code: '300',description:err};
                        res.json(data);
                    } else{
                        var data = {status: 'success', code: '200',result:rows};
                        res.json(data);
                    }

                });


            }
        });
    }else{
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                var data = {status: 'success', code: '200',result:rows};
                res.json(data);
            }
        });
    }

}

module.exports.delete_payment = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var sql = 'delete from payment where payment_id = '+input.payment_id+'; ';

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'err', code: '300',description:err};
            res.json(data);
        } else{
            var sql = 'delete from cart where payment_id = '+input.payment_id+'; ';
            con.query(sql, function (err, row1s) {
                var data = {status: 'success', code: '200'};
                res.json(data);
            });

        }
    });
}

module.exports.add_promotion = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

    var data={
        title:input.title,
        description:input.description,
        effective_date:convertDate(input.effectiveDate),
        expired_date:convertDate(input.expiredDate),
    };
    req.models.promotion.create(data,function(err,rows){
        if(err){
            var data={status:'fail',code:'300',description:err.message};
            res.json(data);
        }
        else{
            var data={status:'success',code:'200'};
            res.json(data);
        }
    });

    function convertDate(inputDate){
        var day = inputDate.split('/')[0];
        var month = inputDate.split('/')[1];
        var year = inputDate.split('/')[2];

        return year+month+day;
    }
}

module.exports.update_cart = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var userid='';
    if (input.userId == undefined){
        userid = req.session.user_id;
    }else{
        userid = input.userId;
    }
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var i = 0;
    var data;
    input.size_id.forEach(function(element) {
        var sql = 'select * from cart where user_id = '+userid+' and product_id = '+element+' and payment_id=0; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(rows==undefined){
                var data = {status: 'err', code: '300',description:"Product is not exist!!!"};
                res.json(data);
            } else{
                if(input.quantity[i] != '0'){
                    sql = 'update cart set amount = '+input.quantity[i]+' where user_id = '+userid+' and product_id = '+element+' and payment_id=0;'
                }
                else{
                    sql = 'delete from cart where user_id = '+userid+' and product_id = '+element+' and payment_id=0; '
                }
                con.query(sql, function (err, rows) {
                    if(err){
                         data = {status: 'err', code: '300',description:err};


                    }else{

                    }
                });
                i++;
            }
        });

    });
    data = {status: 'success', code: '200'};
    res.json(data);


}
module.exports.update_wishlist = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var i = 0;
    input.size_id.forEach(function(element) {
        var sql = 'select * from wishlist where user_id = '+input.userId+' and product_id = '+element+'; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(rows.length<0){
                var data = {status: 'err', code: '300',description:"Product is not exist!!!"};
                res.json(data);
            } else{

                    sql = 'delete from wishlist where user_id = '+input.userId+' and product_id = '+element+'; '

                con.query(sql, function (err, rows) {
                    if(err){
                        var data = {status: 'err', code: '300',description:err};
                        res.json(data);

                    }else{

                    }
                });
                i++;
            }
        });

    });


    var data = {status: 'success', code: '200'};
    res.json(data);
}
module.exports.delete_cart = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

    var sql = 'delete from cart where user_id = '+input.user+' and payment_id = 0; ';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'err', code: '300',description:err};
            res.json(data);
        } else{
            var data = {status: 'success', code: '200'};
            res.json(data);
        }
    });
}

module.exports.get_noti = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

    if(input.seen.trim() == ''){
        var sql = 'select notification_id, title,description,image ,' +
            '(select concat(SUBSTRING(n.create_time, 7, 2),\'/\',SUBSTRING(n.create_time, 5, 2),\'/\',SUBSTRING(n.create_time, 1, 4))) as create_time '+
            'from notification n where user_id = '+input.userId+' order by create_time desc; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                sql = 'update notification set seen_flag = \'Y\' where user_id = '+input.userId+';'
                var con = req.db.driver.db;
                con.query(sql, function (err, row1s) {
                    if(err){
                        var data = {status: 'err', code: '300',description:err};
                        res.json(data);
                    } else{
                        var data = {status: 'success', code: '200',result:rows,total:rows.length};
                        res.json(data);
                    }

                });


            }
        });
    }else{
        var sql = 'select notification_id, title,description,image ,' +
            '(select concat(SUBSTRING(n.create_time, 7, 2),\'/\',SUBSTRING(n.create_time, 5, 2),\'/\',SUBSTRING(n.create_time, 1, 4))) as create_time '+
            'from notification n where user_id = '+input.userId+' and seen_flag = \''+input.seen+'\' order by create_time desc; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                var data = {status: 'success', code: '200',result:rows,total:rows.length};
                res.json(data);
            }
        });
    }
}
module.exports.update_noti_API = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();


    var sql = 'update notification set seen_flag = \''+input.seen+'\' where notification_id = '+input.noti_id+'';


    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'err', code: '300',description:err};
            res.json(data);
        } else{
            var data = {status: 'success', code: '200'};
            res.json(data);
        }
    });
}
module.exports.get_promote = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    if(input.seen.trim() == ''){
        var sql = 'select promotion_id,title,description,image ,' +
            '(select concat(SUBSTRING(n.effective_date, 7, 2),\'/\',SUBSTRING(n.effective_date, 5, 2),\'/\',SUBSTRING(n.effective_date, 1, 4))) as effective_date, '+
            '(select concat(SUBSTRING(n.expired_date, 7, 2),\'/\',SUBSTRING(n.expired_date, 5, 2),\'/\',SUBSTRING(n.expired_date, 1, 4))) as expired_date '+
            'from promotion n where user_id = '+input.userId+' order by effective_date desc; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                sql = 'update promotion set seen_flag = \'Y\' where user_id = '+input.userId+';'
                var con = req.db.driver.db;
                con.query(sql, function (err, row1s) {
                    if(err){
                        var data = {status: 'err', code: '300',description:err};
                        res.json(data);
                    } else{
                        var data = {status: 'success', code: '200',result:rows,total:rows.length};
                        res.json(data);
                    }

                });


            }
        });
    }else{
        var sql = 'select promotion_id, title,description,image ,' +
            '(select concat(SUBSTRING(n.effective_date, 7, 2),\'/\',SUBSTRING(n.effective_date, 5, 2),\'/\',SUBSTRING(n.effective_date, 1, 4))) as effective_date, '+
            '(select concat(SUBSTRING(n.expired_date, 7, 2),\'/\',SUBSTRING(n.expired_date, 5, 2),\'/\',SUBSTRING(n.expired_date, 1, 4))) as expired_date '+
            'from promotion n where user_id = '+input.userId+' and seen_flag = \''+input.seen+'\' order by effective_date desc; ';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                var data = {status: 'success', code: '200',result:rows,total:rows.length};
                res.json(data);
            }
        });
    }
}
module.exports.update_promote_API = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();


    var sql = 'update promotion set seen_flag = \''+input.seen+'\' where promotion_id = '+input.promote_id+'';


    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'err', code: '300',description:err};
            res.json(data);
        } else{
            var data = {status: 'success', code: '200'};
            res.json(data);
        }
    });
}
module.exports.payment_detail = function(req, res){
    if(req.session.type==1){
        var sql = 'select \n' +
            '(select name from product where c.product_id = product_id ) as name,\n' +
            'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
            'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
            'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
            'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date),0) SEPARATOR \'; \')  as disct_prices,\n' +
            'GROUP_CONCAT(\n' +
            'FORMAT(\n' +
            '\tIF(\n' +
            '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
            '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
            '        (select price from product where product_id = c.product_id)*c.amount),\n' +
            '\t0) SEPARATOR \'; \') as sums,\n' +
            'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
            'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
            'sum(\n' +
            '\tIF(\n' +
            '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
            '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
            '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
            'from cart c where payment_id = '+req.query.id+' group by name ;';

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var sql = 'select * from payment where payment_id ='+req.query.id+';';
                con.query(sql, function (err, row1s) {
                    if(!err){
                        var data = {status: 'success', code: '200',result:rows, payment:row1s[0]};
                        res.render('payment_detail',data);
                    }
                });



            }

        });
    }else{
        data={title:'login|signup'};
        res.redirect('/');
    }

};

module.exports.product_detail = function(req, res){
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
        var sql = 'select *, (select cat_name from category where cat_id = p.cat_id) as catflt,' +
            '(select disct_price from discount where product_id = p.product_id and effective_date <= '+year+''+month+day+' and '+year+''+month+''+day+'<=expired_date) as disct_price' +
            ' from product p where name = (select name from product where product_id = '+req.query.id+');';

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var sql = 'select * from description where description_id ='+rows[0].description+';';
                con.query(sql, function (err, row1s) {
                    if(!err){

                        sql = 'select * from image where product_id  = '+req.query.id+';';
                        con.query(sql, function (err, row2s) {
                            if(!err){
                                var data = {status: 'success', code: '200'
                                    ,result:rows
                                    , description:row1s[0].description
                                    ,descriptionId:row1s[0].description_id
                                    ,image:row2s
                                    ,fname:req.session.firstname
                                    ,type:req.session.type
                                    ,userid:req.session.user_id};
                                res.render('product-detail',data);
                            }
                        });

                    }
                });



            }

        });
};
module.exports.create_prd=function(req,res){
    var sql = '';

        sql = 'select cat_id,cat_name from category;'

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var data={title:req.session.firstname+' | Product Creation',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,category:rows,catflt : req.query.cat,catId:req.query.catId}
            res.render('product-creation',data);
        }

    });



};
module.exports.maintenance_prd = function(req, res){
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var formidable = require('formidable');
    var form = new formidable.IncomingForm({
        keepExtensions: true
    });
    form.parse(req);
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
        var sql = '';
        sql += '\n' +
            'select name,product_id,cat_id,image, \n' +
            '(select cat_name from category where cat_id = p.cat_id) as cat_name ,\n' +
            '(select description from description where p.description = description_id) as description ,\n' +
            '(select GROUP_CONCAT(disct_price SEPARATOR \',\') from discount where product_id = p.product_id and effective_date <= '+year+''+month+''+day+' and '+year+''+month+''+day+'<=expired_date) as disct_prices ,\n' +
            '(select GROUP_CONCAT(price SEPARATOR \',\') from product where name = p.name) as prices ,\n' +
            '(select GROUP_CONCAT(size SEPARATOR \',\') from product where name = p.name) as sizes ,\n' +
            '(select GROUP_CONCAT(product_id SEPARATOR \',\') from product where name = p.name) as size_id \n' +
            'from product p ';

        var where = '';
        if(req.query.catflt != undefined && req.query.catflt != '' ){
            where += ' cat_id = (select cat_id from category where cat_name like \'%'+req.query.catflt+'%\') and';
        }
        if(req.query.prdflt != undefined && req.query.prdflt != '' ){
            where += ' name like \'%'+req.query.prdflt+'%\' and';
        }

        if(where.trim() == ''){
            sql+= '  group by name order by product_id;'
        }else{
            where = where.substring(0,where.length-3);
            sql += ' where ' +  where  + '  group by name order by product_id;'
        }
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                if(req.query.catflt != undefined && req.query.catflt != '' ){
                    var data = {status: 'success', code: '200',result:rows,catflt:req.query.catflt,catId:req.query.catId,fname:req.session.firstname,type:req.session.type};
                    res.render('products',data);
                }else{
                    var data = {status: 'success', code: '200',result:rows,cat:'undefined',catId:'undefined'};
                    res.render('products',data);
                }

            }

        });


};
module.exports.maintenance_cat = function(req, res){
   if(req.session.type=='1'){
        var sql = '';
        sql += 'select * from lhc.treefolder order by folder_id asc';


        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                sql = 'select *,\n' +
                    '(select folder_name from treefolder where folder_id = c.folder_id) as folder_name\n' +
                    'from lhc.category c order by folder_id asc';
                con.query(sql, function (err, row1s) {
                    var data = {status: 'success', code: '200',tree:rows, result:row1s,fname:req.session.firstname,type:req.session.type};
                    res.render('categories',data);
                });

            }

        });

    }
    else{
        res.redirect('/');
    }
};
module.exports.show_noti=function(req,res) {
    var sql = 'select * from notification where user_id = '+ req.query.id +';'
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err) {
            var data = {status: 'error', code: '300', error: err};

        }
        else {
            var data = {result: rows,id : req.query.id};
        }

        res.render('notifications', data);
    });
};

    module.exports.noti_register=function(req,res){
        data={title:req.session.firstname+' | Register',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,id:req.query.id};


        res.render('noti-register',data);
    };



    module.exports.add_noti=function(req,res){
        var input=JSON.parse(JSON.stringify(req.body));
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();

        var data={
            title:input.title,
            description:input.description,
            create_time:parseInt(year+''+month+''+day),
            image:input.avatar,
            user_id:req.query.id,
            seen_flag : 'N'
        };
        if(typeof input.id=="undefined"){
            req.models.notification.create(data,function(err,rows){
                if(err){
                    console.log(err);
                }
                else{
                }

            });
        }
        res.redirect('noti-maintenance?id='+req.query.id+'');
    }
module.exports.edit_noti=function(req,res){
    var sql = 'select * from notification where notification_id = '+req.query.noti_id+';'
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err) {
            var data = {status: 'error', code: '300', error: err};

        }
        else {
            var data = {result: rows,fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,id:req.query.id};
        }

        res.render('noti-edit', data);
    });
}
module.exports.update_noti=function(req,res){
    var input=JSON.parse(JSON.stringify(req.body));
    var sql = 'update notification set title = \''+input.title+'\' , description = \''+input.description.trim()+'\', image = \''+input.avatar+'\'' +
        'where notification_id = '+input.id+';'
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err) {
            var data = {status: 'error', code: '300', error: err};

        }
        else {

        }

        res.redirect('noti-maintenance?id='+req.query.user_id+'');
    });
}

function convertDate(inputDate){
    var day = inputDate.split('/')[0];
    var month = inputDate.split('/')[1];
    var year = inputDate.split('/')[2];

    return year+month+day;
}
module.exports.show_promote=function(req,res) {
    var input=JSON.parse(JSON.stringify(req.body));
    var sql = 'select promotion_id,description,' +
        '(select concat(SUBSTRING(p.effective_date, 7, 2),\'/\',SUBSTRING(p.effective_date, 5, 2),\'/\',SUBSTRING(p.effective_date, 1, 4))) as effective_date,\n' +
        '(select concat(SUBSTRING(p.expired_date, 7, 2),\'/\',SUBSTRING(p.expired_date, 5, 2),\'/\',SUBSTRING(p.expired_date, 1, 4))) as expired_date,\n' +
        'title \n' +
        ' from promotion p '

    var where  = 'where ';
    if(req.query.effdate != undefined && req.query.effdate.trim() != ''){
        where += ' effective_date >= '+convertDate(req.query.effdate)+' and';
    }
    if(req.query.expired != undefined && req.query.expired.trim() != ''){
        where += ' expired_date >= '+convertDate(req.query.expired)+' and';
    }

    if(where.trim() != 'where'){
        sql+= where.substring(0,where.length-3) + "  group by title;";
    }else{
        sql+=  "  group by title;";
    }
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err) {
            var data = {status: 'error', code: '300', error: err};

        }
        else {
            var data = {result: rows};
        }

        res.render('promotions', data);
    });
};

module.exports.promote_register=function(req,res){
    data={title:req.session.firstname+' | Register',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type};


    res.render('promote-register',data);
};



module.exports.add_promote=function(req,res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

    var con = req.db.driver.db;
    var sql = 'select user_id from user;';
    con.query(sql, function (err, rows) {
        if(!err){
            rows.forEach(function (element){
                var data={
                    title:input.title,
                    description:input.description,
                    effective_date:convertDate(input.effdate),
                    expired_date:convertDate(input.expired),
                    image:input.avatar,
                    user_id:element.user_id,
                    seen_flag:'N'
                };
                if(typeof input.id=="undefined"){
                    req.models.promotion.create(data,function(err,rows){
                        if(err){
                            console.log(err);
                        }
                        else{
                        }

                    });
                }
            });
        }
    });

    res.redirect('promote-maintenance');

    function convertDate(inputDate){
        var day = inputDate.split('/')[0];
        var month = inputDate.split('/')[1];
        var year = inputDate.split('/')[2];

        return year+month+day;
    }
}
module.exports.edit_promote=function(req,res){
    var sql = 'select promotion_id,title,description,image,' +
        '(select concat(SUBSTRING(p.effective_date, 7, 2),\'/\',SUBSTRING(p.effective_date, 5, 2),\'/\',SUBSTRING(p.effective_date, 1, 4))) as effective_date,' +
        '(select concat(SUBSTRING(p.expired_date, 7, 2),\'/\',SUBSTRING(p.expired_date, 5, 2),\'/\',SUBSTRING(p.expired_date, 1, 4))) as expired_date' +
        ' from promotion p where promotion_id = '+req.query.promote_id+';'
    var con = req.db.driver.db;
    var data;
    con.query(sql, function (err, rows) {
        if (err) {
             data = {status: 'error', code: '300', error: err};
            res.render('promote-edit', data);

        }
        else {
             data = {result: rows,fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type};
            res.render('promote-edit', data);
        }


    });
}
module.exports.update_promote=function(req,res){
    var input=JSON.parse(JSON.stringify(req.body));
    var sql = 'update promotion set title = \''+input.title+'\' , description = \''+input.description+'\', image = \''+input.image+'\' , effective_date = '+convertDate(input.effdate)+'' +
        ', expired_date = '+convertDate(input.expired)+' ' +
        'where  title = (select title from promotion where promotion_id = '+input.id+');'
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err) {
            var data = {status: 'error', code: '300', error: err};

        }
        else {

        }

        res.redirect('promote-maintenance');
    });
    function convertDate(inputDate){
        var day = inputDate.split('/')[0];
        var month = inputDate.split('/')[1];
        var year = inputDate.split('/')[2];

        return year+month+day;
    }
}


module.exports.show_cart = function(req, res){
    if(typeof req.session.user_id!='undefined'){
        var sql = 'select c.payment_id,c.user_id,\n' +
            'GROUP_CONCAT(c.amount SEPARATOR \'; \')  as quantity,\n' +
            '(select name from product where c.product_id = product_id )   as name,\n' +
            '(select title from payment where c.payment_id = payment_id)   as title,\n' +
            'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as size,\n' +
            'group_concat(price separator \'; \') as price,\n' +
            'group_concat(disct_price separator \'; \') as disct_price,\n' +
            'group_concat((price*amount) separator \'; \') as total_before,\n' +
            'group_concat((disct_price*amount) separator \'; \') as total_after,\n' +
            'group_concat((select product_id from product where c.product_id = product_id ) separator \'; \') as sizeId,\n' +
            'group_concat((select image from product where c.product_id = product_id ) separator \'; \') as image,\n' +
            'sum((select (disct_price*c.amount) from product where c.product_id = product_id )) as total\n' +
            'from cart c where payment_id = 0 and user_id = '+req.query.id+' group by name;';

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var sql = 'select * from payment where payment_id = 0 and user_id = '+req.query.id+';';
                con.query(sql, function (err, row1s) {
                    if(!err){
                        //re-calculate payment
                        var sql = 'select * \n' +
                            'from cart c where payment_id = 0 and user_id = '+req.query.id+';';
                        var Sum = 0;
                        var promotion = 0;
                        var totalAfterPromot = 0;
                        con.query(sql, function (err, row5s) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                if(row5s.length > 0){
                                    row5s.forEach(function(element) {
                                        Sum += (parseFloat(element.amount) * parseFloat(element.price));
                                        if(parseFloat(element.disct_price) != 0){
                                            promotion = parseFloat(promotion) + ( ( parseFloat(element.price) -  parseFloat(element.disct_price))*parseFloat(element.amount));
                                        }
                                    });

                                    totalAfterPromot = parseFloat(Sum) - parseFloat(promotion);

                                }
                                var data = {status: 'success', code: '200',result:rows, payment:row1s[0],user_id : req.query.id,
                                    sum:Sum, promotion:promotion, totalAfterPromot:totalAfterPromot};
                                res.render('cart_detail',data);

                            }

                        });




                    }
                });



            }

        });
    }else{
        data={title:'login|signup'};
        res.render('index',data);
    }

};


module.exports.show_payment=function(req,res){
	 var sql = '';
     var sql = 'select p.payment_id,title,pay_type,p.user_id,\n' +
         '(select concat(firstname,\' \',lastname) from user where user_id = p.user_id) as name,\n' +
         '(select email from user where user_id = p.user_id) as email,\n' +
         '(select COUNT(product_id) from cart where payment_id = p.payment_id) as products,\n' +
         'p.status_id,\n' +
         'p.promotion,\n' +
         'p.sum as total_before_promote,\n' +
         'p.total as total_after_promote,\n' +
         '(select concat(SUBSTRING(p.create_time, 7, 2),\'/\',SUBSTRING(p.create_time, 5, 2),\'/\',SUBSTRING(p.create_time, 1, 4))) as date \n' +
         'from payment p ';
     var where = '';
     if((req.query.userflt != undefined) && (req.query.userflt.trim()!='')){
         where += ' p.user_id = (select user_id frome user where username = \''+req.query.userflt+'\') and';
     }
     if((req.query.statusflt != undefined) && (req.query.statusflt.trim()!='none')){
         where += ' p.status_id = '+req.query.statusflt+' and';
     }
     if((req.query.createflt != undefined) && (req.query.createflt.trim()!='')){
         var day = req.query.createflt.split('/')[1];
         var month = req.query.createflt.split('/')[0];
         var year = req.query.createflt.split('/')[2];
         where += ' p.create_time > '+year+month+day+' and';
     }

     if(where.trim()!=''){
         where = where.substring(0,where.length-3);
         sql += ' where '+where + ' ;';
     }else{
         sql += ' ;';
     }
     var con = req.db.driver.db;
     con.query(sql, function (err, rows) {
         if(err){
             console.log(err);
         }
         data={title:req.session.firstname+' | show_payment',fname:req.session.firstname,
             payments:rows,
             pic:req.session.pic,
             type:req.session.type,
             userid:req.session.user_id};
         res.render('show_payment',data);

     });
};
module.exports.checkout = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var user = '';
    if(input.user == undefined){
        user=req.session.user_id;
    }else{
        user=input.user;
    }
    var sql = 'select \n' +
        '(select name from product where c.product_id = product_id ) as name,\n' +
        'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
        'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
        'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
        'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date),0) SEPARATOR \'; \')  as discount_prices,\n' +
        'GROUP_CONCAT(\n' +
        'FORMAT(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount),\n' +
        '\t0) SEPARATOR \'; \') as sums,\n' +
        'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
        'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
        'sum(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<=20181111 and 20181111<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
        'from cart c where payment_id = 0  and user_id = '+user+' group by name ;';

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            sql = 'select firstname,lastname,phone,email,address from user where user_id = ' +user + ';';
            var con = req.db.driver.db;
            con.query(sql, function (err, row1s) {
                if(row1s.length > 0) {
                    var data = {status: 'success', code: '200',result:rows,fname:req.session.firstname,
                        pic:req.session.pic,
                        type:req.session.type,
                        userid:req.session.user_id,
                        userdetail : row1s};
                    res.render("payment",data);
                }else{
                    var data = {status: 'success', code: '200',result:rows,fname:req.session.firstname,
                        pic:req.session.pic,
                        type:req.session.type,
                        userid:req.session.user_id};
                    res.render("payment",data);
                }

            });

        }

    });
};

