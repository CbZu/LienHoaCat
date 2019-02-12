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
   /* var formidable = require('formidable');

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
*/

   var sql = 'select folder_id from treefolder where folder_name = \''+input.newFolder+'\'';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            if(rows.length>0){
                var data={
                    cat_name:input.newCat,
                    /*image:req.files.upfile.path.split("\\")[ req.files.upfile.path.split("\\").length-1],*/
                    folder_id: rows[0].folder_id
                };
                req.models.category.create(data,function(err,row1s) {
                    if (err) {
                        var data = {status: 'fail', code: '300', description : err.message};
                        res.json(data);
                    } else {
                        res.json(200
                        );
                    }
                });
            } else {
                sql = 'insert into treefolder(folder_name) values (\''+input.newFolder+'\');';
                con.query(sql, function (err, row1s) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        var data={
                            cat_name:input.newCat,
                            /*image:req.files.upfile.path.split("\\")[ req.files.upfile.path.split("\\").length-1],*/
                            folder_id: row1s.insertId
                        };
                        req.models.category.create(data,function(err,row1s) {
                            if (err) {
                                var data = {status: 'fail', code: '300', description : err.message};
                                res.json(data);
                            } else {
                                res.json(200
                                );
                            }
                        });
                    }

                });
            }
        }

    });

};
module.exports.update_category = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    if(input.action == 'delete'){
        var sql = 'delete from category where cat_id = '+input.id+'';
    } else {
        var sql = 'update category set cat_name = \''+input.name+'\' where cat_id = '+input.id+'';
    }

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300'};
            res.json(data);
        }else{
            var data = {status: 'success', code: '200'};
            res.json(data);
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
        if(__dirname.split('/').length <= 1){
            var newpath = __dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]);
        }else{
            var newpath = __dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]);
        }

        console.log(oldpath);
        console.log(newpath);
        console.log(__dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]));
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

// Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                console.log('File written!');
                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });


        });
        i++;
    });

    var data = {status: 'success', code: '200'};
    res.json(data);

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
    /*var myip = require('quick-local-ip');*/
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
                        if(input.payment_id != undefined){
                            getAmount = 'select * from cart where product_id = '+element+' and user_id = '+userid+' and payment_id = '+input.payment_id+';';
                        }
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
                                if(input.quantity[i] != 0){
                                    if(row2s.length>0){
                                        var sqlUpdate = 'update cart set amount = '+(parseInt(input.quantity[i])+parseInt(row2s[0].amount))+' where product_id = '+element+' and user_id = '+userid+' and payment_id = 0;';
                                        if(input.payment_id != undefined){
                                            sqlUpdate = 'update cart set amount = '+(parseInt(input.quantity[i])+parseInt(row2s[0].amount))+' where product_id = '+element+' and user_id = '+userid+' and payment_id = '+input.payment_id+';';
                                        }

                                        con.query(sqlUpdate,function(err,row1s) {
                                            if (err) {
                                                var data = {status: 'fail', code: '300', description : err.message};
                                                res.json(data);
                                            } else {

                                            }
                                        });
                                    }else{
                                        if(input.payment_id != undefined){
                                            var data={
                                                user_id: parseInt(userid),
                                                product_id:element,
                                                amount:input.quantity[i],
                                                payment_id:parseInt(input.payment_id),
                                                create_time:parseInt(year+''+month+''+day),
                                                status_id:0,
                                                price : input.price[i]
                                            };
                                        } else {
                                            var data={
                                                user_id: parseInt(userid),
                                                product_id:element,
                                                amount:input.quantity[i],
                                                payment_id:0,
                                                create_time:parseInt(year+''+month+''+day),
                                                status_id:0
                                            };
                                        }

                                        req.models.cart.create(data,function(err,row1s) {
                                            if (err) {
                                                var data = {status: 'fail', code: '300', description : err.message};
                                                res.json(data);
                                            } else {
                                                if(input.payment_id == undefined) {
                                                var updatePrice = 'update cart set disct_price = 0, price = 0' +
                                                    ' where product_id = '+element+' and user_id = '+userid+' and payment_id = 0  ;';

                                                    updatePrice = 'update cart set disct_price = (), price = 0' +
                                                        ' where product_id = ' + element + ' and user_id = ' + userid + ' and payment_id = ' + input.payment_id + '  ;';

                                                    con.query(updatePrice, function (err, row4s) {
                                                        if (!err) {

                                                        }
                                                    });
                                                } else {

                                                }
                                            }
                                        });
                                    }
                                }

                                i++;
                            }
                        });

                    });


                    var data = {status: 'success', code: '200'};
                    res.json(data);
                }else{
                        var cart = new Array();
                        var amount = new Array();
                        if(req.cookies.cart != undefined){
                            cart = req.cookies.cart.id.split(',');
                            amount = req.cookies.cart.amount.split(',');
                        }
                        var i = 0
                        input.size_id.forEach(function(element) {
                            if(cart.indexOf(element) > -1){
                                amount[cart.indexOf(element)] = parseInt(amount[cart.indexOf(element)]) + parseInt(input.quantity[i]);
                            } else {
                                cart.push(element);
                                amount.push(input.quantity[i]);
                            }

                            i++
                        });

                        if(req.cookies.cart != undefined){
                            var carts = {
                                id : cart.toString(),
                                amount :amount.toString()
                            }
                        } else {
                            var carts = {
                                id : cart.toString(),
                                amount :amount.toString()
                            }
                        }

                        res.cookie("cart", carts);
                        var data = {status: 'success', code: '200'};
                        res.json(data);

                }
            }

        });


};
module.exports.get_cart = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var today = year+''+month+''+day;
    var user = '';
    if(req.query.user == undefined){
        user=req.session.user_id;
    }else{
        user=req.query.user ;
    }
    var array = [];
    if(user == undefined && req.cookies.cart != undefined){
        var count = 0;
        for(var i = 0 ; i < req.cookies.cart.id.split(',').length ; i++){
            var sql = 'select \n' +
                '(select name from product where c.product_id = product_id ) as name,\n' +
                'GROUP_CONCAT('+req.cookies.cart.amount.split(',')[i]+' SEPARATOR \'; \') as quantities,\n' +
                'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
                'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
                'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date),0) SEPARATOR \'; \')  as discount_prices,\n' +
                'GROUP_CONCAT(\n' +
                'FORMAT(\n' +
                'IF(\n' +
                '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.cookies.cart.amount.split(',')[i]+',\n' +
                '        (select price from product where product_id = c.product_id)*'+req.cookies.cart.amount.split(',')[i]+'),\n' +
                '0) SEPARATOR \'; \') as sums,\n' +
                'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
                'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                'sum(\n' +
                'IF(\n' +
                '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.cookies.cart.amount.split(',')[i]+',\n' +
                '        (select price from product where product_id = c.product_id)*'+req.cookies.cart.amount.split(',')[i]+')) as total \n' +
                'from product c where product_id in  ('+req.cookies.cart.id.split(',')[i]+') group by name ;';

            var con = req.db.driver.db;
            con.query(sql, function (err, rows) {
                if(err){
                    var data = {status: 'error', code: '300',error: err};
                    res.json(data);
                }else{
                    if(rows.length > 0){
                        array.push(rows[0]);
                    }
                    count++;
                    if(count == req.cookies.cart.id.split(',').length){
                        var data = {status: 'success', code: '200',result:array};
                        res.json(data);
                    }


                }
            });
        }

    } else{
        var sql = 'select \n' +
            '(select name from product where c.product_id = product_id ) as name,\n' +
            'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
            'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
            'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
            'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date),0) SEPARATOR \'; \')  as discount_prices,\n' +
            'GROUP_CONCAT(\n' +
            'FORMAT(\n' +
            '\tIF(\n' +
            '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
            '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*c.amount,\n' +
            '        (select price from product where product_id = c.product_id)*c.amount),\n' +
            '\t0) SEPARATOR \'; \') as sums,\n' +
            'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
            'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
            'sum(\n' +
            '\tIF(\n' +
            '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
            '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*c.amount,\n' +
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
            }

        });
    }

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
module.exports.get_voucher = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var today = year+''+month+''+day;
    if(input.mode == 'check_exist'){
        sql = 'select code from voucher where code = \''+input.voucher+'\'';
    } else {
        sql = 'select percent,min from voucher where code = \''+input.voucher+'\' and effective_date<='+today+' and '+today+'<=expired_date and min < '+input.total+';';

    }

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{
            var data = {status: 'success', code: '200',result:rows};
            if(rows.length == 0){
                data = {status: 'not exist', code: '404'};
            }else{
                if(parseInt(rows[0].percent) > 100){
                    var totalAfer = input.total - parseInt(rows[0].percent);
                } else {
                    var totalAfer = input.total*rows[0].percent/100;
                }

                data = {status: 'success', code: '200', totalAfter:totalAfer};
            }

            res.json(data);

        }

    });
};
module.exports.add_voucher = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var today = year+''+month+''+day;
    if(req.session.type == '1'){
        for (var i = 0 ; i < input.vouchers.split(',').length ; i++){
            data = {
                code:input.vouchers.split(',')[i],
                percent:input.percents.split(',')[i],
                effective_date:input.effdates.split(',')[i].replace(/-/g,''),
                expired_date:input.expireddates.split(',')[i].replace(/-/g,''),
                amount:input.amounts.split(',')[i],
                min:input.mins.split(',')[i],
                name:input.names.split(',')[i]
            }
            req.models.voucher.create(data, function(err, row2s) {
                if(err){
                    data={status:'err',code:'300',description:err};
                    res.json(data);
                }else{

                }

            });
        }
        data={status:'success',code:'200'};
        res.json(data);
    }
};
module.exports.voucher = function(req, res){

    if(req.session.type == '1'){
        var input=JSON.parse(JSON.stringify(req.body));
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();
        var today = year+''+month+''+day;
        var sql ='select *,(if(v.expired_date < '+today+' , (select \'Y\'), (select \'N\'))) as oldnew from voucher v order by expired_date desc, amount asc;';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            var data = {fname:req.session.firstname
                ,type:req.session.type
                ,userid:req.session.user_id
                ,treefolder:req.session.treefolder
                ,result:rows};
            res.render('voucher',data);
        });


    } else {
        res.redirect('/')
    }
};

module.exports.updatevoucher = function(req, res){

    if(req.session.type == '1'){
        var input=JSON.parse(JSON.stringify(req.body));
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();
        var today = year+''+month+''+day;
        var sql ='update voucher set name = \''+input.name+'\' , code = \''+input.code+'\', percent = '+input.percent+',effective_date = '+input.effdate.replace(/-/g,'')+' ,' +
            ' expired_date = '+input.expired.replace(/-/g,'')+', ' +
            'amount = '+input.amount+', ' +
            'min = '+input.min+
            ' where voucher_id = '+req.params.id+' ';
        var con = req.db.driver.db;
        con.query(sql)
        res.redirect('/voucher')

    } else {
        res.redirect('/')
    }
};
module.exports.deletevoucher = function(req, res){

    if(req.session.type == '1'){
        var input=JSON.parse(JSON.stringify(req.body));
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();
        var today = year+''+month+''+day;
        var sql ='delete from voucher'+
            ' where voucher_id = '+req.params.id+' ';
        var con = req.db.driver.db;
        con.query(sql)
        res.redirect('/voucher')

    } else {
        res.redirect('/')
    }
};
module.exports.add_to_payment = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var today = year+''+month+''+day;
    var user = '';
    if(input.user == undefined){
        user=req.session.user_id;
    }else{
        user=input.user;
    }
    var sql = 'select \n' +
        '(select title from payment order by title desc limit 1\n) as title' +
        ',sum(\n' +
        '\tIF(\n' +
        '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
        '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*c.amount,\n' +
        '        (select price from product where product_id = c.product_id)*c.amount)) as total ';
    if((input.voucher != undefined)&&(input.voucher.trim != "")){
        sql += ',(select percent from voucher where code = \''+input.voucher+'\' and effective_date<='+today+' and '+today+'<=expired_date) as percent \n';

    }

    sql+='from cart c where payment_id = 0  and user_id = '+user+'  ;';
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
                Sum = rows[0].total;
                if((input.voucher != undefined)&&(input.voucher.trim() != "")){
                    if(rows[0].percent!='NULL')
                        if(parseInt(rows[0].percent) > 100){
                            promotion =  rows[0].percent;
                        } else {
                            promotion = Sum*rows[0].percent/100;
                        }

                }

                totalAfterPromot = Sum-promotion;
                var padStart = require('pad-start');
                var title = ''
                if(rows[0].title == null){
                    title = '000000'
                } else {
                    var title = rows[0].title.substring(3);

                }
                var newtitle = parseInt(title) + 1;
                newtitle = 'LHC' + padStart(newtitle.toString(),6,'0');
                var sqlIns = 'INSERT INTO `lhc`.`payment`\n' +
                    '(`user_id`,\n' +
                    '`sum`,\n' +
                    '`status_id`,`create_time`,`title`,`pay_type`,`promotion`,`total`,`seen_flag`,`ship`,`voucher`,`shipfee`,`note`,`address`,`name`,`phone`)\n';
                sqlIns +='VALUES ('+user+','+Sum+',0,'+parseInt(year+''+month+''+day)+',\''+newtitle+'\',\''+input.type+'\','+promotion+','+totalAfterPromot+',\'N\',\''+input.ship+'\'' +
                    ',\''+input.voucher+'\','+input.shipfee+',\''+input.note+'\',\''+input.address+'\',\''+input.name+'\',\''+input.phone+'\')';
                con.query(sqlIns, function (err, row1s) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        var sqlGet = 'select * from cart where user_id = '+user+' and payment_id = 0;'

                        con.query(sqlGet, function (err, rowsCart) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                for(var i = 0 ; i < rowsCart.length ; i++){
                                    var sqlUpdate = 'update cart set payment_id = '+row1s.insertId+',disct_price = (select disct_price from discount where product_id = '+rowsCart[i].product_id+' and effective_date<='+today+' and '+today+'<=expired_date)' +
                                        ', price = (select price from product where product_id = '+rowsCart[i].product_id+')' +
                                        ', name = (select name from product where product_id = '+rowsCart[i].product_id+') ' +
                                        ', size = (select size from product where product_id = '+rowsCart[i].product_id+') ' +
                                        ', code = (select code from product where product_id = '+rowsCart[i].product_id+') ' +
                                        ' where user_id = '+user+' and payment_id = 0 and product_id = '+rowsCart[i].product_id+';';
                                    con.query(sqlUpdate);
                                }
                                if(req.session.user_id == undefined){
                                    res.clearCookie("cart");
                                }

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
    if(req.session.type == '1'){
        var input=JSON.parse(JSON.stringify(req.body));
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();

        if(input.mode == 'pay'){
            var sql = 'select *,' +
                '(select percent from voucher where code = \''+input.voucher+'\') as voucher' +
                ' from cart c where payment_id = '+input.payment_id+'; ';
        } else {
            if(input.status == undefined){
                var sql = 'update payment set seen_flag = \''+input.seen+'\' where payment_id = '+input.payment_id+'; ';
            }else{
                var sql = 'update payment set status_id = '+input.status+',seen_flag = \''+input.seen_flag+'\' where payment_id = '+input.payment_id+'; ';
            }
        }


        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'err', code: '300',description:err};
                res.json(data);
            } else{
                if(input.mode == 'pay'){
                    var sum = 0;
                    var promotion = 0;
                    var total = 0;
                    for( var i = 0; i < rows.length ; i++){
                        if(rows[i].disct_price == null || rows[i].disct_price == 0 ){
                            sum += rows[i].price * rows[i].amount;
                        } else {
                            sum += rows[i].disct_price* rows[i].amount;
                        }
                    }

                    if(rows[0].voucher != 'NULL' && rows[0].voucher != '0' && rows[0].voucher != null){
                        if( parseInt(rows[0].voucher)  >100){
                            promotion = rows[0].voucher;
                        } else {
                            promotion = sum * rows[0].voucher / 100;
                        }

                    }
                    total = sum - promotion;
                    sql = 'update payment set sum = '+sum+', promotion = '+promotion+' , total = '+total+',voucher = \''+input.voucher+'\', shipfee = '+input.shipfee+' , shipcode = \''+input.shipcode+'\',ship = \''+input.ship+'\',pay_type = \''+input.type+'\', note = \''+input.note+'\' ' +
                        'where payment_id = '+input.payment_id+'; '
                    con.query(sql);
                   /* sql = 'update payment set shipfee = 0 where payment_id = '+input.payment_id+' and total > (select freeShip from settingshop)';
                    con.query(sql);
                    sql = 'update payment set shipfee = (select defaultShip from settingshop) where payment_id = '+input.payment_id+' and total < (select freeShip from settingshop)';
                    con.query(sql);*/
                } else {
                    if(input.status == '1'){
                        sql ='select product_id,amount,(select entity from product where product_id = c.product_id) as entity from cart c where payment_id = '+input.payment_id+';';
                        con.query(sql, function (err, row1s) {
                            if(!err){

                                row1s.forEach(function(element) {
                                    var result = parseInt(element.entity) - parseInt(element.amount);
                                    sql = 'update product set entity = '+result+' where product_id = '+element.product_id+';';
                                    con.query(sql);
                                });
                            }
                        });
                    }
                    if(input.status == '4' || input.status == '5'){
                        sql ='select product_id,amount,(select entity from product where product_id = c.product_id) as entity from cart c where payment_id = '+input.payment_id+';';
                        con.query(sql, function (err, row1s) {
                            if(!err){

                                row1s.forEach(function(element) {
                                    var result = parseInt(element.entity) + parseInt(element.amount);
                                    sql = 'update product set entity = '+result+' where product_id = '+element.product_id+';';
                                    con.query(sql);
                                });
                            }
                        });
                    }
                    if(input.status == '6'){
                        sql = 'delete from cart where payment_id = '+input.payment_id+';';
                        con.query(sql);
                        sql = 'delete from payment where payment_id = '+input.payment_id+';';
                        con.query(sql);
                    }
                }
                var data = {status: 'success', code: '200'};
                res.json(data);
            }
        });
    } else {
        var data = {status: 'fail', code: '300'};
        res.json(data);
    }

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
    var sql = '';
    if(req.session.user_id == undefined){
        var cart = new Array();
        var amount = new Array();
        if(req.cookies.cart != undefined){
            cart = req.cookies.cart.id.split(',');
            amount = req.cookies.cart.amount.split(',');
        }
        var i = 0
        input.size_id.forEach(function(element) {
            if(cart.indexOf(element.toString()) > -1){
                if(input.quantity[i] == '0'){
                    cart.splice(cart.indexOf(element.toString()),1);
                    amount.splice(cart.indexOf(element.toString()),1);
                } else {
                    amount[cart.indexOf(element.toString())] =  parseInt(input.quantity[i]);
                }

            } else {
                cart.push(element.toString());
                amount.push(input.quantity[i]);
            }

            i++
        });

        if(req.cookies.cart != undefined){
            var carts = {
                id : cart.toString(),
                amount :amount.toString()
            }
        } else {
            var carts = {
                id : cart.toString(),
                amount :amount.toString()
            }
        }
        if(cart.length == 0){
            res.clearCookie('cart');
        } else {
            res.cookie("cart", carts);
        }




    } else {
        input.size_id.forEach(function(element) {
            if(input.userpayment != undefined){
                sql = 'select * from cart where user_id = '+input.userpayment+' and product_id = '+element+' and payment_id='+input.payment+'; ';
            } else{
                sql = 'select * from cart where user_id = '+userid+' and product_id = '+element+' and payment_id=0; ';
            }

            var con = req.db.driver.db;
            con.query(sql, function (err, rows) {
                if(rows==undefined){
                    var data = {status: 'err', code: '300',description:"Product is not exist!!!"};
                    res.json(data);
                } else{
                    if(input.quantity[i] != '0'){
                        if(input.userpayment != undefined){
                            sql = 'update cart set amount = '+input.quantity[i]+' where user_id = '+input.userpayment+' and product_id = '+element+' and payment_id='+input.payment+'; ';
                        } else {
                            sql = 'update cart set amount = '+input.quantity[i]+' where user_id = '+userid+' and product_id = '+element+' and payment_id=0;'
                        }
                    }
                    else{
                        if(input.userpayment != undefined){
                            sql = 'delete from cart where user_id = '+input.userpayment+' and product_id = '+element+' and payment_id='+input.payment+'; ';
                        } else {
                            sql = 'delete from cart where user_id = '+userid+' and product_id = '+element+' and payment_id=0; '
                        }

                    }
                    con.query(sql) ;
                    i++;
                }
            });

        });
    }

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
    if(req.session.type != undefined){
        if(req.query.id != undefined) {
            var input = JSON.parse(JSON.stringify(req.body));
            var date = new Date();
            var month = date.getMonth() + 1;
            month = (month < 10 ? "0" : "") + month;

            var day = date.getDate();
            day = (day < 10 ? "0" : "") + day;
            var year = date.getUTCFullYear();
            var today = year + '' + month + '' + day;
            var user = '';
            var status = new Array();
            status.push('Đặt hàng');
            status.push('Chốt Gửi');
            status.push('Đang Giao Hàng');
            status.push('Thành Công');
            status.push('Boom');
            status.push('Chuyển Hoàn');
            status.push('Hủy');
            if (req.query.user == undefined) {
                user = req.session.user_id;
            } else {
                user = req.query.user;
            }
            var sql = 'select c.user_id,c.payment_id,\n' +
                'c.name,\n' +
                '(select title from payment where c.payment_id = payment_id ) as title,\n' +
                '(select voucher from payment where c.payment_id = payment_id ) as voucher,\n' +
                'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
                'GROUP_CONCAT(c.size SEPARATOR \'; \') as sizes,\n' +
                'GROUP_CONCAT(FORMAT(c.price,0) SEPARATOR \'; \')  as prices,\n' +
                'GROUP_CONCAT(FORMAT(c.disct_price,0) SEPARATOR \'; \')  as discount_prices,\n' +
                'GROUP_CONCAT(\n' +
                '\tIF(\n' +
                '\t\tc.disct_price<>\'NULL\',\n' +
                '        c.disct_price*c.amount,\n' +
                '        c.price*c.amount)\n' +
                '\t SEPARATOR \'; \') as sums,\n' +
                'GROUP_CONCAT(c.product_id SEPARATOR \'; \') as size_ids,\n' +
                'GROUP_CONCAT(c.code SEPARATOR \'; \') as codes,\n' +
                'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                '(select status_id from payment where payment_id = c.payment_id ) as status_id,\n' +
                '(select sum from payment where payment_id = c.payment_id ) as paymentSum,\n' +
                '(select promotion from payment where payment_id = c.payment_id ) as promotion,\n' +
                '(select ship from payment where payment_id = c.payment_id ) as ship,\n' +
                '(select pay_type from payment where payment_id = c.payment_id ) as pay_type,\n' +
                '(select total from payment where payment_id = c.payment_id ) as paymentTotal,\n' +
                '(select shipfee from payment where payment_id = c.payment_id ) as shipfee,\n' +
                '(select note from payment where payment_id = c.payment_id ) as note,\n' +
                '(select shipcode from payment where payment_id = c.payment_id ) as shipcode,\n' +
                'sum(\n' +
                '\tIF(\n' +
                '\t\tc.disct_price <>\'NULL\',\n' +
                '        c.disct_price *c.amount,\n' +
                '        c.price*c.amount)) as total \n' +
                'from cart c where payment_id = ' + req.query.id + '  and user_id = ' + user + ' group by name ;';

            var con = req.db.driver.db;
            con.query(sql, function (err, rows) {
                if (err) {
                    var data = {status: 'error', code: '300', error: err};
                    res.json(data);
                } else {
                    sql = 'select name as firstname, phone, address from payment where payment_id = '+req.query.id+';';
                    var con = req.db.driver.db;
                    con.query(sql, function (err, row1s) {
                        var totalAll = 0;
                        if (row1s.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                                for (var j = 0; j < rows[i].sums.split(";").length; j++) {
                                    totalAll += parseFloat(rows[i].sums.split(";")[j]);
                                }

                            }
                            sql = 'select * from lhc.settingshop';
                            con.query(sql, function (err, row1setting){
                                var data = {
                                    status: 'success', code: '200', result: rows, fname: req.session.firstname,
                                    pic: req.session.pic,
                                    type: req.session.type,
                                    userid: req.session.user_id,
                                    totalAll: totalAll,
                                    userdetail: row1s, treefolder: req.session.treefolder,status:status, setting: row1setting
                                };
                                res.render("payment_detail", data);
                            });

                        } else {
                            sql = 'select * from lhc.settingshop';
                            con.query(sql, function (err, row1setting){
                                var data = {
                                    status: 'success', code: '200', result: rows, fname: req.session.firstname,
                                    pic: req.session.pic,
                                    type: req.session.type,
                                    totalAll: totalAll,
                                    userid: req.session.user_id, treefolder: req.session.treefolder,status:status, setting: row1setting
                                };
                                res.render("payment_detail", data);
                            });

                        }
                    });


                }

            });
        } else{
            var padStart = require('pad-start');
            var sql = 'select title from payment order by title desc';
            var con = req.db.driver.db;
            con.query(sql, function (err, rows) {
                var title = rows[0].title.substring(3);
                var newtitle = parseInt(title) + 1;
                newtitle = 'LHC' + padStart(newtitle.toString(),6,'0');
                sql = 'select * from lhc.settingshop';
                con.query(sql, function (err, row1setting){
                    var data = {fname:req.session.firstname
                        ,type:req.session.type
                        ,userid:req.session.user_id
                        ,title : newtitle
                        ,treefolder:req.session.treefolder, setting: row1setting};
                    res.render("create_payment",data)
                });

            });

        }
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
            '(select menh from thuoctinh where product_id  = p.product_id) as menh, '+
            '(select tuoi from thuoctinh where product_id  = p.product_id) as tuoi, '+
            '(select mau from thuoctinh where product_id  = p.product_id) as mau, '+
            '(select freeShip from settingshop) as freeship, '+
            '(select disct_price from discount where product_id = p.product_id and effective_date <= '+year+''+month+day+' and '+year+''+month+''+day+'<=expired_date) as disct_price' +
            ' from product p where  name = \''+req.params.prdname.replace(/-/g,' ')+'\';';

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var sql = 'select * from description where description_id ='+rows[0].description+';';
                con.query(sql, function (err, row1s) {
                    if(!err){

                        sql = 'select * from image where product_id  = '+rows[0].product_id+';';
                        con.query(sql, function (err, row2s) {
                            if(!err){
                                var data = {status: 'success', code: '200'
                                    ,result:rows
                                    , description:row1s[0].description
                                    ,descriptionId:row1s[0].description_id
                                    ,image:row2s
                                    ,fname:req.session.firstname
                                    ,type:req.session.type
                                    ,userid:req.session.user_id
                                    ,treefolder:req.session.treefolder
                                    , keyword:req.cookies.keyword};
                                res.render('product-detail',data);
                            }
                        });

                    }
                });



            }

        });
};

module.exports.edit_product = function(req, res){
    if(req.session.type == 1){
        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();
        var sql = 'select *, (select cat_name from category where cat_id = p.cat_id) as catflt,' +
            '(select menh from thuoctinh where product_id  = p.product_id) as menh, '+
            '(select tuoi from thuoctinh where product_id  = p.product_id) as tuoi, '+
            '(select mau from thuoctinh where product_id  = p.product_id) as mau, '+
            '(select sizefrom from thuoctinh where product_id  = p.product_id) as sizefrom, '+
            '(select sizeto from thuoctinh where product_id  = p.product_id) as sizeto, '+
            '(select disct_price from discount where product_id = p.product_id and effective_date <= '+year+''+month+day+' and '+year+''+month+''+day+'<=expired_date) as disct_price' +
            ' from product p where name = \''+req.params.prdname.replace(/-/g,' ')+'\';';

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var sql = 'select * from description where description_id ='+rows[0].description+';';
                con.query(sql, function (err, row1s) {
                    if(!err){

                        sql = 'select * from image where product_id  = '+rows[0].product_id+';';
                        con.query(sql, function (err, row2s) {
                            if(!err){
                                var data = {status: 'success', code: '200'
                                    ,result:rows
                                    , description:row1s[0].description
                                    ,descriptionId:row1s[0].description_id
                                    ,image:row2s
                                    ,fname:req.session.firstname
                                    ,type:req.session.type
                                    ,userid:req.session.user_id
                                    ,catflt : req.params.catflt
                                    ,catId : row1s[0].cat_id
                                    ,treefolder:req.session.treefolder};
                                res.render('product-edit',data);
                            }
                        });

                    }
                });

            }

        });
    } else {
        res.redirect('/')
    }

};

module.exports.delete_product = function(req, res){
    if(req.session.type == 1){
        var sql = 'update product set validFlag = \'2\' where name = \'' + req.params.prdname.replace(/-/g,' ') + '\';';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var data={status:"success", code:'400'};
                res.redirect(req.get('referer'));
            }
        });
    } else {
        res.redirect('/');
    }

}
module.exports.delete_size = function(req, res){
    if(req.session.type == 1){
        var sql = 'select *,(select cat_name from category where cat_id = p.cat_id) as cat_name from product p where name = (select name from product where product_id = '+req.params.id+') order by product_id asc;';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var url = '/edit-product/'+rows[0].name.replace(/ /g,'-');
                var data={status:"success", code:'500'};
                if(rows.length > 1){
                    if(rows[0].product_id == req.params.id){
                        var sql = 'update image set product_id = '+rows[1].product_id+';';
                        con.query(sql);
                        var sql = 'update thuoctinh set product_id = '+rows[1].product_id+';';
                        con.query(sql);
                    }
                } else if (rows.length == 1) {
                    var sql = 'delete from  image where  product_id = '+rows[0].product_id+';';
                    con.query(sql);
                    var sql = 'delete from  thuoctinh where  product_id = '+rows[0].product_id+';';
                    con.query(sql);

                    url = '/maintenance-prd/'+rows[0].cat_name.replace(/ /g,'-');
                    var data={status:"success", code:'600'};
                }
                var sql = 'delete from  discount where  product_id = '+req.params.id+';';
                con.query(sql);
                sql = 'delete from product where product_id = '+req.params.id+''
                con.query(sql);
                sql = 'delete from cart where product_id = '+req.params.id+' and payment_id = 0;';
                con.query(sql);

                res.json(data);
            }
        });
    } else {
        res.redirect('/')
    }

}
module.exports.erase_product = function(req, res){
    if(req.session.type == 1){
        var sql = 'select *,(select cat_name from category where cat_id = p.cat_id) as cat_name from product p where name = \''+req.params.prdname+'\' order by product_id asc;';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                for(var i = 0; i < rows.length ; i++){
                    var sql = 'delete from  thuoctinh where  product_id = '+rows[0].product_id+';';
                    con.query(sql);
                    sql = 'delete from product where product_id = '+rows[i].product_id+''
                    con.query(sql);
                    sql = 'delete from cart where product_id = '+rows[i].product_id+' and payment_id = 0;';
                    con.query(sql);
                    sql = 'delete from discount where product_id = '+rows[i].product_id+';';
                    con.query(sql);
                }

                sql = 'select * from image where product_id = '+rows[0].product_id+';';
               con.query(sql, function (err, element) {
                   var newpath = '';
                   for( var k = 0 ; k < element.length ; k++){
                       for( var h = 0 ; h < element[k].url.split(";").length ; h++){
                           var oldpath = element[k].url.split(';')[h];
                           if(__dirname.split('/').length <= 1){
                                newpath = __dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]);
                           }else{
                                newpath = __dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]);
                           }
                           fs.unlink(newpath,function(err){
                               if(err) console.log('file deleted fail');
                           });
                       }
                   }

                   var sql = 'delete from  image where  product_id = '+rows[0].product_id+';';
                   con.query(sql);
               });

                var data = {status: 'success', code: '200'};
                res.json(data);
            }
        });
    } else {
        res.redirect('/')
    }

}

module.exports.delete_cat = function(req, res){
    if(req.session.type == 1){
        var sql = 'select *,(select cat_name from category where cat_id = p.cat_id) as cat_name from product p where cat_id = (select cat_id from category where cat_name = \''+req.params.name+'\') order by product_id asc;';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var image = ''
                for(var i = 0; i < rows.length ; i++){
                    /*var sql = 'delete from  image where  product_id = '+rows[i].product_id+';';
                    con.query(sql);*/
                    var sql = 'delete from  thuoctinh where  product_id = '+rows[i].product_id+';';
                    con.query(sql);
                    sql = 'delete from product where product_id = '+rows[i].product_id+''
                    con.query(sql);
                    sql = 'delete from cart where product_id = '+rows[i].product_id+' and payment_id = 0;';
                    con.query(sql);
                    sql = 'delete from discount where product_id = '+rows[i].product_id+';';
                    con.query(sql);
                    image += rows[i].product_id+',';
                }
                if(image.trim()!=''){
                    sql = 'select * from image where product_id in ('+image.substr(0,image.length-1)+');';
                    con.query(sql, function (err, element) {
                        var newpath = '';

                        for( var k = 0 ; k < element.length ; k++){
                            for( var h = 0 ; h < element[k].url.split(";").length ; h++){
                                var oldpath = element[k].url.split(';')[h];
                                if(__dirname.split('/').length <= 1){
                                    newpath = __dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]);
                                }else{
                                    newpath = __dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]);
                                }
                                fs.unlink(newpath,function(err){
                                    if(err) console.log('file deleted fail');
                                });
                            }
                            var sql = 'delete from  image where  product_id = '+element[k].product_id+';';
                            con.query(sql);
                        }


                    });
                }

                sql = 'delete from category where cat_name = \''+req.params.name+'\';';
                con.query(sql);
                res.redirect('maintenance-cat');
            }
        });
    } else {
        res.redirect('/')
    }

}
module.exports.show_product = function(req, res){
    if(req.session.type == 1){
        var sql = 'update product set validFlag = \'1\' where name = \'' + req.params.prdname.replace(/-/g,' ') + '\';';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var data={status:"success", code:'400'};
                res.redirect(req.get('referer'));
            }
        });
    } else {
        res.redirect('/');
    }

}
module.exports.create_prd=function(req,res){
    if(req.session.type == 1){
        var sql = '';

        sql = 'select cat_id,cat_name from category where cat_name = \''+req.query.cat+'\';'

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                var data={title:req.session.firstname+' | Product Creation',
                    fname:req.session.firstname,
                    dateFormat:dateFormat,
                    pic:req.session.pic,
                    type:req.session.type,
                    catflt : req.query.cat,
                    catId:rows[0].cat_id,
                    treefolder:req.session.treefolder}
                res.render('product-creation',data);
            }

        });
    } else {
        res.redirect('/');
    }




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
            'select name, validFlag, p.product_id,cat_id,image, \n' +
            '(select cat_name from category where cat_id = p.cat_id) as cat_name ,\n' +
            '(select GROUP_CONCAT(entity SEPARATOR \',\') from product where name = p.name) as entities ,\n' +
            '(select GROUP_CONCAT(code SEPARATOR \',\') from product where name = p.name) as codes ,\n' +
            '(select description from description where p.description = description_id) as description ,\n' +
            '(select MIN(disct_price) from discount where product_id = p.product_id and effective_date <= '+year+''+month+''+day+' and '+year+''+month+''+day+'<=expired_date) as disct_prices ,\n' +
            '(select MIN(price) from product where name = p.name) as prices ,\n' +
            '(select GROUP_CONCAT(size SEPARATOR \',\') from product where name = p.name) as sizes ,\n' +
            '(select GROUP_CONCAT(product_id SEPARATOR \',\') from product where name = p.name) as size_id ,\n' +
            '(select url from image where product_id = p.product_id and type = 1 limit 1) as image, \n' +
            '(select freeShip from settingshop ) as freeship, \n' +
            'IF(('+year+month+day+' - p.create_time ) < 100, \'Y\', \'N\') as new \n'+
            'from product p join thuoctinh t on p.product_id = t.product_id join description d on p.description = d.description_id ';

        var where = '';
        if(req.params.catflt != undefined && req.params.catflt != 'Search' && req.params.catflt != 'All' && req.params.catflt != 'undefined'){
            where += ' cat_id = (select cat_id from category where cat_name = \''+req.params.catflt.replace(/-/g,' ')+'\') and';
        }
        if(req.query.prdflt != undefined && req.query.prdflt != '' ){
            where += ' name like \'%'+req.query.prdflt+'%\' and';
        }
    if(req.query.menh != undefined && req.query.menh != '' && req.query.menh != 'undefined' ){
        where += ' t.menh like \'%'+req.query.menh+'%\' and';
    }
    if(req.query.tuoi != undefined && req.query.tuoi != ''  && req.query.tuoi != 'undefined'){
        where += ' t.tuoi like \'%'+req.query.tuoi+'%\' and';
    }
    if(req.query.mau != undefined && req.query.mau != ''  && req.query.mau != 'undefined'){
        where += ' t.mau like \'%'+req.query.mau+'%\' and';
    }
    if(req.query.size != undefined && req.query.size != ''  && req.query.size != 'undefined'){
        where += ' t.sizefrom < '+req.query.size+' and t.sizeto > '+req.query.size+' and';
    }
    var keyword='keyword='+req.query.keyword+'&size='+req.query.size+'&menh='+req.query.menh+'&mau='+req.query.mau+'&tuoi='+req.query.tuoi+'';
    if(req.query.keyword != 'undefined' && req.query.keyword != '' && req.query.keyword != undefined ){
        where += ' (t.mau REGEXP \''+req.query.keyword.replace(",","|")+'\'\n' +
            'or t.menh REGEXP \''+req.query.keyword.replace(",","|")+'\' \n' +
            'or t.tuoi REGEXP \''+req.query.keyword.replace(/mao/g,'mẹo').replace(/mão/g,'mẹo').replace(/thình/g,'thìn').replace(/thinh/g,'thìn').replace(",","|")+'\' \n' +
            'or d.description REGEXP \''+req.query.keyword.replace(",","|")+'\' \n' +
            'or p.name REGEXP \''+req.query.keyword.replace(",","|")+'\' \n' +
            'or p.size REGEXP \''+req.query.keyword.replace(",","|")+'\') and';


    } else {
        keyword = '';
    }

    res.cookie("keyword", keyword);;
    if (req.session.type == 1){
        if(where.trim() == ''){
            sql+= ' group by name  order by p.entity asc ;'
        }else{
            where = where.substring(0,where.length-3);
            sql += ' where ' +  where  + ' group by name order by p.entity asc;'
        }
    } else{
        if(where.trim() == ''){
            sql+= 'and p.validFlag = \'1\'  group by name  order by p.entity asc ;'
        }else{
            where = where.substring(0,where.length-3);
            sql += ' where ' +  where  + ' and p.validFlag = \'1\'  group by name order by p.entity asc;'
        }
    }
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{
                if(req.params.catflt != undefined && req.params.catflt != 'Search' ){
                    var data = {status: 'success',
                        code: '200',
                        result:rows,
                        catflt:req.params.catflt.replace(/-/g," "),
                        catId:'undefined',
                        fname:req.session.firstname,
                        type:req.session.type,
                        treefolder:req.session.treefolder,
                        keyword:req.query.keyword,
                        menh:req.query.menh,
                        mau:req.query.mau,
                        size:req.query.size,
                        tuoi:req.query.tuoi};
                    res.render('products',data);
                }else{
                    var data = {status: 'success',
                        code: '200',
                        result:rows,
                        catflt:'undefined',
                        catId:'undefined',
                        treefolder:req.session.treefolder,
                        fname:req.session.firstname,
                        type:req.session.type,
                        keyword:req.query.keyword,
                        menh:req.query.menh,
                        mau:req.query.mau,
                        size:req.query.size,
                        tuoi:req.query.tuoi};
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
                    sql = 'select * from lhc.settingshop';
                    con.query(sql, function (err, row1set) {
                        var data = {status: 'success', code: '200', setting:row1set, tree:rows, result:row1s,fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder};
                        res.render('categories',data);
                    });
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
    var formidable = require('formidable');
    var form = new formidable.IncomingForm({
        keepExtensions: true
    });
    form.parse(req);

    var i = 0;

        var oldpath = req.files.newImg.path;

    if(__dirname.split('/').length <= 1){
        var newpath = __dirname.replace(__dirname.split('\\')[__dirname.split('\\').length-1],'public\\assets\\img\\'+oldpath.split("\\")[ oldpath.split("\\").length-1]);
    }else{
        var newpath = __dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]);
    }
    console.log(__dirname);
    console.log(oldpath);
    console.log(newpath);
        console.log(__dirname.replace(__dirname.split('/')[__dirname.split('/').length-1],'public/assets/img/'+oldpath.split("/")[ oldpath.split("/").length-1]));
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

// Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                console.log('File written!');
                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });


        });





    var con = req.db.driver.db;
    var data={
        title:input.name,
        description:input.description,
        effective_date:input.effdate.replace(/-/g,''),
        expired_date:input.expiredDate.replace(/-/g,''),
        image:req.files.newImg.path.split('/').length<=1?req.files.newImg.path.split('\\')[req.files.newImg.path.split('\\').length-1]:req.files.newImg.path.split('/')[req.files.newImg.path.split('/').length-1],
        user_id:0,
        seen_flag:'N'
    };
    if(req.session.type == '1'){
        req.models.promotion.create(data,function(err,rows){
            if(err){
                console.log(err);
            }
            else{
            }

        });
    }

    res.redirect('promotions');

    function convertDate(inputDate){
        var day = inputDate.split('/')[0];
        var month = inputDate.split('/')[1];
        var year = inputDate.split('/')[2];

        return year+month+day;
    }
}
module.exports.edit_promote=function(req,res){
    if(req.session.type == 1){
        var sql = 'select promotion_id,title,description,image,' +
            '(select concat(SUBSTRING(p.effective_date, 7, 2),\'/\',SUBSTRING(p.effective_date, 5, 2),\'/\',SUBSTRING(p.effective_date, 1, 4))) as effective_date,' +
            '(select concat(SUBSTRING(p.expired_date, 7, 2),\'/\',SUBSTRING(p.expired_date, 5, 2),\'/\',SUBSTRING(p.expired_date, 1, 4))) as expired_date' +
            ' from promotion p where title = \''+req.params.promote_id.replace(/-/g,' ')+'\';'
        var con = req.db.driver.db;
        var data;
        con.query(sql, function (err, rows) {
            if (err) {
                data = {status: 'error', code: '300', error: err};
                res.render('promote-edit', data);

            }
            else {
                data = {result: rows,fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,treefolder:req.session.treefolder};
                res.render('promote-edit', data);
            }


        });
    } else {
       res.redirect('/');
    }

}
module.exports.delete_promote=function(req,res){
    if(req.session.type == 1){
        var sql = 'delete ' +
            ' from promotion where title = \''+req.params.promote_id.replace(/-/g,' ')+'\';'
        var con = req.db.driver.db;
        var data;
        con.query(sql);
        res.redirect('/promotions');
    } else {
        res.redirect('/');
    }
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
    if((req.session.user_id != undefined)){
        var sql = '';
        var sql = 'select p.payment_id,title,pay_type,p.user_id,\n' +
            'p.name,\n' +
            'p.phone,\n' +
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
        if((req.session.user_id != undefined) && (req.session.type != "1")){
            where += ' p.user_id = '+req.session.user_id+' and';
        }
        if((req.query.statusflt != undefined) && (req.query.statusflt.trim()!='none')){
            where += ' p.status_id = '+req.query.statusflt+' and';
        }
        if((req.query.phone != undefined) && (req.query.phone.trim()!='')){
            where += ' p.user_id = (select user_id from user where phone = \''+req.query.phone+'\' limit 1) and';
        }
        if((req.query.titleflt != undefined) && (req.query.titleflt.trim()!='')){
            where += ' p.title = \''+req.query.titleflt+'\' and';
        }
        if((req.query.shipflt != undefined) && (req.query.shipflt.trim()!='')){
            where += ' p.shipcode = \''+req.query.shipflt+'\' and';
        }
            if((req.query.createflt != undefined) && (req.query.createflt.trim()!='')){
            var day = req.query.createflt.split('/')[1];
            var month = req.query.createflt.split('/')[0];
            var year = req.query.createflt.split('/')[2];
            where += ' p.create_time > '+year+month+day+' and';
        }

        if(where.trim()!=''){
            where = where.substring(0,where.length-3);
            sql += ' where '+where + ' order by p.status_id asc, p.create_time desc;';
        }else{
            sql += ' order by p.status_id asc, p.create_time desc;';
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
                userid:req.session.user_id,treefolder:req.session.treefolder};
            res.render('show_payment',data);

        });
    } else {
        res.redirect('/')
    }

};
module.exports.checkout = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var today = year+''+month+''+day;
    var user = '';
    if(input.user == undefined){
        user=req.session.user_id;
    }else{
        user=input.user;
    }


        if(user == undefined){//checkout without signin
            var totalAll = 0;
            var array = [];
            if(req.params.product != 'cart'){ // mua ngay
                var sql = 'select \n' +
                    '(select name from product where c.product_id = product_id ) as name,\n' +
                    'GROUP_CONCAT('+req.params.amount+' SEPARATOR \'; \') as quantities,\n' +
                    'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as product_id,\n' +
                    'GROUP_CONCAT((select price from product where product_id = c.product_id) SEPARATOR \'; \')  as prices,\n' +
                    'GROUP_CONCAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date) SEPARATOR \'; \')  as discount_prices,\n' +
                    'GROUP_CONCAT(\n' +
                    'IF(\n' +
                    '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.params.amount+'\n' +
                    '        (select price from product where product_id = c.product_id)*'+req.params.amount+'),\n' +
                    ' SEPARATOR \'; \') as sums,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
                    'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                    'sum(\n' +
                    'IF(\n' +
                    '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.params.amount+',\n' +
                    '        (select price from product where product_id = c.product_id)*'+req.params.amount+')) as total \n' +
                    'from product c where product_id in  ('+req.params.product+') group by name ;';

                var con = req.db.driver.db;
                con.query(sql, function (err, rows) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        sql = 'select * from lhc.settingshop';
                        con.query(sql, function (err, row1setting){
                            array.push(rows[0]);
                            totalAll += parseFloat(rows[0].sums.replace(/,/g , ''));

                                var data = {
                                    status: 'success', code: '200', setting:row1setting, result: array, fname: req.session.firstname,
                                    pic: req.session.pic,
                                    type: req.session.type,
                                    userid: req.session.user_id,
                                    totalAll: totalAll,
                                    userdetail:undefined,
                                    treefolder: req.session.treefolder,
                                    muangay:'Y'
                                };
                                res.render("payment", data);

                        });



                    }
                });
            } else{
                if( req.cookies.cart != undefined){
                    var count =0;
                    for(var i = 0 ; i < req.cookies.cart.id.split(',').length ; i++){
                        var sql = 'select \n' +
                            '(select name from product where c.product_id = product_id ) as name,\n' +
                            'GROUP_CONCAT('+req.cookies.cart.amount.split(',')[i]+' SEPARATOR \'; \') as quantities,\n' +
                            'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
                            'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as product_id,\n' +
                            'GROUP_CONCAT((select price from product where product_id = c.product_id) SEPARATOR \'; \')  as prices,\n' +
                            'GROUP_CONCAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date) SEPARATOR \'; \')  as discount_prices,\n' +
                            'GROUP_CONCAT(\n' +
                            '\n' +
                            'IF(\n' +
                            '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                            '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.cookies.cart.amount.split(',')[i]+',\n' +
                            '        (select price from product where product_id = c.product_id)*'+req.cookies.cart.amount.split(',')[i]+')\n' +
                            ' SEPARATOR \'; \') as sums,\n' +
                            'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
                            'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                            'sum(\n' +
                            'IF(\n' +
                            '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                            '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.cookies.cart.amount.split(',')[i]+',\n' +
                            '        (select price from product where product_id = c.product_id)*'+req.cookies.cart.amount.split(',')[i]+')) as total \n' +
                            'from product c where product_id in  ('+req.cookies.cart.id.split(',')[i]+') group by name ;';

                        var con = req.db.driver.db;
                        con.query(sql, function (err, rows) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                if(rows.length > 0){
                                    array.push(rows[0]);
                                    totalAll += parseFloat(rows[0].sums.replace(/,/g , ''));
                                }
                                count++;
                                if(count == req.cookies.cart.id.split(',').length) {
                                    sql = 'select * from lhc.settingshop';
                                    con.query(sql, function (err, row1setting){
                                        var data = {
                                            status: 'success', code: '200', setting:row1setting, result: array, fname: req.session.firstname,
                                            pic: req.session.pic,
                                            type: req.session.type,
                                            userid: req.session.user_id,
                                            totalAll: totalAll,
                                            userdetail:undefined,
                                            treefolder: req.session.treefolder,
                                            muangay:'N'
                                        };
                                        res.render("payment", data);
                                    });
                                }
                            }
                        });
                    }
                } else {
                    res.redirect('/');
                }

            }

        } else {
            if(req.params.product != 'cart') { // mua ngay
                var sql = 'select \n' +
                    '(select name from product where c.product_id = product_id ) as name,\n' +
                    'GROUP_CONCAT('+req.params.amount+' SEPARATOR \'; \') as quantities,\n' +
                    'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as product_id,\n' +
                    'GROUP_CONCAT((select price from product where product_id = c.product_id) SEPARATOR \'; \')  as prices,\n' +
                    'GROUP_CONCAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date) SEPARATOR \'; \')  as discount_prices,\n' +
                    'GROUP_CONCAT(\n' +
                    'IF(\n' +
                    '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.params.amount+',\n' +
                    '        (select price from product where product_id = c.product_id)*'+req.params.amount+')\n' +
                    ' SEPARATOR \'; \') as sums,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
                    'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                    'sum(\n' +
                    'IF(\n' +
                    '(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*'+req.params.amount+',\n' +
                    '        (select price from product where product_id = c.product_id)*'+req.params.amount+')) as total \n' +
                    'from product c where product_id in  ('+req.params.product+') group by name ;';
                var con = req.db.driver.db;
                con.query(sql, function (err, rows) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        sql = 'select firstname,lastname,phone,email,address,user_id from user where user_id = ' +user + ';';
                        var con = req.db.driver.db;
                        con.query(sql, function (err, row1s) {
                            var totalAll = 0;

                            sql = 'select * from lhc.settingshop';
                            con.query(sql, function (err, row1setting){
                                if(row1s.length > 0) {
                                    for(var i = 0 ; i < rows.length ;i++){
                                        for(var j = 0 ; j < rows[i].sums.split(';').length ;j++) {
                                            totalAll += parseFloat(rows[i].sums.split(';')[j]);
                                        }
                                    }
                                    var data = {status: 'success', code: '200', setting:row1setting, result:rows,fname:req.session.firstname,
                                        pic:req.session.pic,
                                        type:req.session.type,
                                        userid:req.session.user_id,
                                        totalAll : totalAll,
                                        userdetail : row1s,treefolder:req.session.treefolder,
                                        muangay:'Y'};
                                    res.render("payment",data);
                                }else{
                                    var data = {status: 'success', code: '200', setting:row1setting, result:rows,fname:req.session.firstname,
                                        pic:req.session.pic,
                                        type:req.session.type,
                                        totalAll : totalAll,
                                        userid:req.session.user_id,treefolder:req.session.treefolder,
                                        muangay:'Y'};
                                    res.render("payment",data);
                                }
                            });

                        });

                    }

                });
            } else {
                var sql = 'select \n' +
                    '(select name from product where c.product_id = product_id ) as name,\n' +
                    'GROUP_CONCAT(c.amount SEPARATOR \'; \') as quantities,\n' +
                    'GROUP_CONCAT((select size from product where c.product_id = product_id ) SEPARATOR \'; \') as sizes,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as product_id,\n' +
                    'GROUP_CONCAT(FORMAT((select price from product where product_id = c.product_id),0) SEPARATOR \'; \')  as prices,\n' +
                    'GROUP_CONCAT(FORMAT((select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date),0) SEPARATOR \'; \')  as discount_prices,\n' +
                    'GROUP_CONCAT(\n' +
                    '\tIF(\n' +
                    '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*c.amount,\n' +
                    '        (select price from product where product_id = c.product_id)*c.amount)\n' +
                    '\t SEPARATOR \'; \') as sums,\n' +
                    'GROUP_CONCAT((select product_id from product where c.product_id = product_id ) SEPARATOR \'; \') as size_ids,\n' +
                    'GROUP_CONCAT((select url from image where c.product_id = product_id and type = 1 group by product_id) SEPARATOR \'; \') as images,\n' +
                    'sum(\n' +
                    '\tIF(\n' +
                    '\t\t(select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)<>\'NULL\',\n' +
                    '        (select disct_price from discount where product_id = c.product_id and effective_date<='+today+' and '+today+'<=expired_date)*c.amount,\n' +
                    '        (select price from product where product_id = c.product_id)*c.amount)) as total \n' +
                    'from cart c where payment_id = 0  and user_id = '+user+' group by name ;';
                var con = req.db.driver.db;
                con.query(sql, function (err, rows) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    }else{
                        sql = 'select firstname,lastname,phone,email,(select address from places where user_id = '+user+')as address,user_id from user where user_id = ' +user + ';';
                        var con = req.db.driver.db;
                        con.query(sql, function (err, row1s) {
                            var totalAll = 0;

                            sql = 'select * from lhc.settingshop';
                            con.query(sql, function (err, row1setting){
                                if(row1s.length > 0) {
                                    for(var i = 0 ; i < rows.length ;i++){
                                        for(var j = 0 ; j < rows[i].sums.split(';').length ;j++) {
                                            totalAll += parseFloat(rows[i].sums.split(';')[j]);
                                        }
                                    }
                                    var data = {status: 'success', code: '200', setting:row1setting, result:rows,fname:req.session.firstname,
                                        pic:req.session.pic,
                                        type:req.session.type,
                                        userid:req.session.user_id,
                                        totalAll : totalAll,
                                        userdetail : row1s,treefolder:req.session.treefolder,
                                        muangay:'N'};
                                    res.render("payment",data);
                                }else{
                                    var data = {status: 'success', code: '200', setting:row1setting, result:rows,fname:req.session.firstname,
                                        pic:req.session.pic,
                                        type:req.session.type,
                                        totalAll : totalAll,
                                        userid:req.session.user_id,treefolder:req.session.treefolder,
                                        muangay:'N'};
                                    res.render("payment",data);
                                }
                            });

                        });

                    }

                });
            }

        }


};

module.exports.app_phongthuy = function (req, res) {
    var input=JSON.parse(JSON.stringify(req.body));
    var YearOfBirth = req.query.year;
    if (YearOfBirth==undefined){
        var data = {status: 'init', code: '200',fname:req.session.firstname,
            pic:req.session.pic,
            type:req.session.type,
            userid:req.session.user_id,
            userid:req.session.user_id,treefolder:req.session.treefolder};
        res.render("app-phong-thuy",data);
    } else {
        var sql = 'select can.CAN, can.`AC`, chi.CHI, chi.PHATHOMENH, chi.`BC` from can, chi where can.a=' + YearOfBirth%10 +' and chi.b=' + YearOfBirth%12 + ';';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            } else{
                var tuoi = '';
                var phathomenh = '';
                var c=0;
                for(var i = 0 ; i < rows.length ;i++){
                    tuoi = rows[i].CAN + ' ' + rows[i].CHI;
                    phathomenh = rows[i].PHATHOMENH;
                    c = (rows[i].AC + rows[i].BC)%5;
                }
                sql1 = 'select MANG from mang where id = ' + c + ';';
                var con = req.db.driver.db;
                con.query(sql1, function (err, row1s) {
                    if(err){
                        var data = {status: 'error', code: '300',error: err};
                        res.json(data);
                    } else{
                        var mang = '';
                        mang = row1s[0].MANG;
                        var data = {status: 'success', code: '200',fname:req.session.firstname,
                            pic:req.session.pic,
                            type:req.session.type,
                            userid:req.session.user_id,
                            tuoi : tuoi,
                            phathomenh : phathomenh,
                            mang : mang,
                            year : YearOfBirth,
                            b : YearOfBirth%12,
                            c : c,
                            userid:req.session.user_id
                            ,treefolder:req.session.treefolder};
                        res.render("app-phong-thuy",data);
                    }
                });
            }
        });
    }
}
module.exports.promotions = function(req, res){
        var sql = '';
        sql += 'select * from promotion order by effective_date asc';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                var data = {status: 'error', code: '300',error: err};
                res.json(data);
            }else{

                    var data = {status: 'success', code: '200', result:rows,fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder};
                    res.render('promotions',data);

            }

        });

};

module.exports.create_promotions = function(req, res){
    if(req.session.type == '1'){
        var data = {status: 'success', code: '200',fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder};
        res.render('promotion-creation',data);
    } else {
        res.redirect('/');
    }

};

module.exports.promotions_detail = function(req, res){
    var sql = '';
    sql += 'select * from promotion where title = \''+req.params.title.replace(/-/g,' ')+'\'';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            var data = {status: 'error', code: '300',error: err};
            res.json(data);
        }else{

            var data = {status: 'success', code: '200', result:rows,fname:req.session.firstname,type:req.session.type,treefolder:req.session.treefolder};
            res.render('promotion-detail',data);

        }

    });

};