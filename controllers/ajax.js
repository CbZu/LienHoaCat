var md5 = require('MD5');
exports.checkEmail=function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
			var data={
			email:input.email
		};
	req.models.user.find(data, function(err, rows,next) {
					if (err){
				data={status:'error',code:'200'};
			}
			else{
					if(rows.length>0){
						data={status:'exist',code:'300'};
						}
					else{
						data={status:'success',code:'400'};
						}	
			}
							res.json(data);
		});
};
exports.checkProduct=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var data={
        name:input.name
    };

    var sql = 'select * from product where name = \''+input.name+'\';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if (err){
            data={status:'error',code:'200'};
        }
        else{
            if(rows.length>0){
                data={status:'exist',code:'300'};

            }
            else{
                data={status:'success',code:'400'};

            }
            res.json(data);
        }
    });

};
exports.updateSizeId=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var sql = 'update cart set amount = '+input.quantity+' where product_id = '+input.sizeId+' and payment_id = '+input.paymentId+';';
    var con = req.db.driver.db;
    con.query(sql, function (err, row5s) {
        if(err){
            console.log(err);
        }
        else{
            //re-calculate payment
            var sql = 'select * \n' +
                'from cart c where payment_id = '+input.paymentId+';';
            var Sum = 0;
            var promotion = 0;
            var totalAfterPromot = 0;
            con.query(sql, function (err, rows) {
                if(err){
                    var data = {status: 'error', code: '300',error: err};
                    res.json(data);
                }else{
                    if(rows.length > 0){
                        rows.forEach(function(element) {
                            Sum += (parseFloat(element.amount) * parseFloat(element.price));
                            if(parseFloat(element.disct_price) != 0){
                                promotion = parseFloat(promotion) + ( ( parseFloat(element.price) -  parseFloat(element.disct_price))*parseFloat(element.amount));
                            }
                        });

                        totalAfterPromot = parseFloat(Sum) - parseFloat(promotion);
                        var sqlIns = 'update payment set sum = '+Sum+', promotion = '+promotion+', total = '+totalAfterPromot+'  where payment_id = '+input.paymentId+' ;';
                        con.query(sqlIns, function (err, row1s) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                var data={status:"success"};
                                res.json(data);
                            }
                        });

                    }else{
                        var data = {status: 'Empty', code: '400',description:"There is no products in cart !!!"};
                        res.json(data);
                    }

                }

            });



        }
    });
};
exports.deleteSizeId=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var sql = 'delete from cart where product_id = '+input.sizeId+' and payment_id = '+input.paymentId+';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        else{
            //re-calculate payment
            var sql = 'select * \n' +
                'from cart c where payment_id = '+input.paymentId+';';
            var Sum = 0;
            var promotion = 0;
            var totalAfterPromot = 0;
            con.query(sql, function (err, rows) {
                if(err){
                    var data = {status: 'error', code: '300',error: err};
                    res.json(data);
                }else{
                    if(rows.length > 0){
                        rows.forEach(function(element) {
                            Sum += (parseFloat(element.amount) * parseFloat(element.price));
                            if(parseFloat(element.disct_price) != 0){
                                promotion = parseFloat(promotion) + ( ( parseFloat(element.price) -  parseFloat(element.disct_price))*parseFloat(element.amount));
                            }
                        });

                        totalAfterPromot = parseFloat(Sum) - parseFloat(promotion);
                        var sqlIns = 'update payment set sum = '+Sum+', promotion = '+promotion+', total = '+totalAfterPromot+'  where payment_id = '+input.paymentId+' ;';
                        con.query(sqlIns, function (err, row1s) {
                            if(err){
                                var data = {status: 'error', code: '300',error: err};
                                res.json(data);
                            }else{
                                var data={status:"success"};
                                res.json(data);
                            }
                        });

                    }else{
                        var data = {status: 'Empty', code: '400',description:"There is no products in cart !!!"};
                        res.json(data);
                    }

                }

            });
        }
    });
};

exports.updateProduct=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var con = req.db.driver.db;
    for(var i = 0;i < input.sizeId.split(';').length ; i++){
        var sql = 'update product set price = '+input.PriceValue.split(';')[i]+' , disct_price = '+input.DiscountValue.split(';')[i]+'' +
            ' where product_id = '+input.sizeId.split(';')[i]+' ;';
        con.query(sql, function (err, rows) {
            if(err){
                console.log(err);
            }
        })
    }

    var sql = 'update description set description = \''+input.description.trim()+'\' where description_id = '+input.descriptionId+' ;';
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
    })
    data={status:'success',code:'400'};
    res.json(data);
};
exports.updateProductImage=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var con = req.db.driver.db;

    if(input.type == 1){
        var sql = 'select * from image where product_id = '+input.product_id+' and type = 1;'
        con.query(sql, function (err, rows) {
            if(err){
                console.log(err);
            }
            else{
                if(rows.length > 0){
                    sql = 'update image set url = \''+input.url+'\' where product_id = '+input.product_id+' and type = '+1+'' +
                        ' and url = \''+rows[0].url+'\';';
                    con.query(sql, function (err, row1s) {
                        if(err){
                            console.log(err);
                        }
                    });
                }else{
                    var sql = 'insert into image values ('+input.product_id+',\''+input.url+'\',\''+input.type+'\');';
                    con.query(sql, function (err, rows) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            }
        });
        data={status:'success',code:'400'};
        res.json(data);

    }else{
        var sql = 'insert into image values ('+input.product_id+',\''+input.url+'\',\''+input.type+'\');';
        con.query(sql, function (err, rows) {
            if(err){
                console.log(err);
            }
        });
        data={status:'success',code:'400'};
        res.json(data);
    }

};
exports.updateProductOk=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();
    var data={
        cat_id:input.category,
        create_time:parseInt(year+''+month+''+day),
        name:input.name,
        price:input.price,
        disct_price:input.discount,
        size:input.size,
        image:'',
        code:input.code,
        description : input.descriptionId,
    };
    req.models.product.create(data,function(err,row1s){
        if(err){
            var data={status:'fail',code:'300',description:err.message};
            res.json(data);
        }
        else{

        }
    });
    data={status:'success',code:'400'};
    res.json(data);
};
exports.addProduct=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var con = req.db.driver.db;
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
    var prdId = '';
    var avas = '';
        var path = '';
        if(req.files.upfiles.length == undefined){
            path = req.files.upfiles.path;
        } else{
            for(j = 0 ; j < req.files.upfiles.length ; j++){
                if(path == ''){
                    path = req.files.upfiles[j].path;
                    avas = req.files.upfiles[j].path.split("\\")[ req.files.upfiles[j].path.split("\\").length-1];
                }else{
                    path += ';' +  req.files.upfiles[j].path;
                    avas += ';' +  req.files.upfiles[j].path.split("\\")[ req.files.upfiles[j].path.split("\\").length-1];
                }
            }
        }
        var desc = input.description;
        var sql = 'insert into description(description) value (\''+desc.replace('\n','<br>')+'\');';
        con.query(sql, function (err, rows) {
            if(err){
                console.log(err);
            }else{
                var i = 0;
                input.Sizes.split(',').forEach(function (element){

                    var img = path.split(";")[0];

                    var data={
                        cat_id:input.category,
                        create_time:parseInt(year+''+month+''+day),
                        name:input.name,
                        price:input.Prices.split(',')[i]!=''?input.Prices.split(',')[i].trim():0,
                        disct_price:0,
                        size:element,
                        image:'',
                        code:input.Codes.split(',')[i],
                        description : rows.insertId,
                        image:img,
                        information : input.Infos.split(',')[i],
                        entity:input.Entities.split(',')[i]!=''?input.Entities.split(',')[i].trim():0,
                    };

                    req.models.product.create(data,function(err,row1s){
                        if(err){
                            var data={status:'fail',code:'300',description:err.message};
                            res.json(data);
                        }
                        else{
                            if(prdId == ''){

                                var sql = 'update image set product_id = '+row1s.product_id+' where product_id = 0 ;';
                                con.query(sql);
                                sql = 'INSERT INTO `lhc`.`image`\n' +
                                    '(`product_id`,\n' +
                                    '`url`,\n' +
                                    '`type`)\n' +
                                    'VALUES\n' +
                                    '('+row1s.product_id+',\n' +
                                    '\''+avas+'\',\n' +
                                    '\'1\');\n';
                                con.query(sql);
                                sql = 'INSERT INTO `lhc`.`thuoctinh`\n' +
                                    '(`product_id`,\n' +
                                    '`mau`,\n' +
                                    '`tuoi`,\n' +
                                    '`menh`,`sizefrom`,`sizeto`)\n' +
                                    'VALUES\n' +
                                    '('+row1s.product_id+',\n' +
                                    '\''+input.Mau+'\',\n' +
                                    '\''+input.Tuoi+'\',\n' +
                                    '\''+input.Menh+'\','+input.SizeFrom+','+input.SizeTo+');\n'
                                con.query(sql);
                            }
                            prdId = row1s.product_id;
                            if(input.Discounts.split(',')[i]!=''){
                                sql = 'INSERT INTO `lhc`.`discount`\n' +
                                    '(`product_id`,\n' +
                                    '`effective_date`,\n' +
                                    '`expired_date`,\n' +
                                    '`disct_price`)\n' +
                                    'VALUES\n' +
                                    '('+row1s.product_id+',\n' +
                                    ''+year+''+month+''+day+',\n' +
                                    ''+input.expired_date+',\n' +
                                    ''+input.Discounts.split(',')[i]+');'
                                con.query(sql);
                            }
                        }

                    });
                    i++;

                });


            }
        });

        var data={status:'success',code:'400',path:path};
        res.json(data);


};

exports.addProductImages=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var con = req.db.driver.db;
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
    var prdId = '';

    var path = req.files.images.path;
        var img = '';
        img=req.files.images.path.split("\\")[ req.files.images.path.split("\\").length-1];
        var data={status:'success',code:'400',path:path,image:img};
        res.json(data);

};
exports.addSizeToCart=function(req,res){
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

                    console.log(input.size_id);
                    userid = rows[0].user_id;
                    var getAmount = 'select * from cart where product_id = '+input.size_id+' and user_id = '+userid+' and payment_id = '+input.payment_id+';';
                    var dataCart ={
                        product_id:input.size_id,
                        user_id:userid,
                        payment_id : input.payment_id
                    };
                    con.query(getAmount, function (err, row2s) {
                        if(err){
                            var data = {status: 'error', code: '300',error: err};
                            res.json(data);
                        }else{
                            if(row2s.length>0){
                                var sqlUpdate = 'update cart set amount = '+(parseInt(input.quantity[i])+parseInt(row2s[0].amount))+' where product_id = '+input.size_id+' and user_id = '+userid+';';
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
                                    product_id:parseInt(input.size_id),
                                    amount:parseInt(input.quantity),
                                    payment_id:parseInt(input.payment_id),
                                    create_time:parseInt(year+''+month+''+day),
                                    status_id:0
                                };
                                req.models.cart.create(data,function(err,row1s) {
                                    if (err) {
                                        var data = {status: 'fail', code: '300', description : err.message};
                                        res.json(data);
                                    } else {
                                        var updatePrice = 'update cart set disct_price = (select disct_price from product where product_id = '+input.size_id+'), price = (select price from product where product_id = '+input.size_id+')' +
                                            ' where product_id = '+input.size_id+' and user_id = '+userid+' and payment_id = '+input.payment_id+'  ;';
                                        con.query(updatePrice, function (err, row4s) {
                                            if(!err){
                                                //re-calculate payment
                                                var sql = 'select * \n' +
                                                    'from cart c where payment_id = '+input.payment_id+';';
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
                                                            var sqlIns = 'update payment set sum = '+Sum+', promotion = '+promotion+', total = '+totalAfterPromot+'  where payment_id = '+input.payment_id+' ;';
                                                            con.query(sqlIns, function (err, row1s) {
                                                                if(err){
                                                                    var data = {status: 'error', code: '300',error: err};
                                                                    res.json(data);
                                                                }else{
                                                                    var data = {status: 'success', code: '200'};
                                                                    res.json(data);
                                                                }
                                                            });

                                                        }else{
                                                            var data = {status: 'Empty', code: '400',description:"There is no products in cart !!!"};
                                                            res.json(data);
                                                        }

                                                    }

                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            i++;
                        }
                    });

            }else{
                var data = {status: 'error', code: '300',error: "User not found!!!"};
                res.json(data);
            }
        }

    });
};
exports.checkEmailAddProject=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var data={
        email:input.email
    };
    req.models.user.find(data, function(err, rows,next) {
        if (err){
            data={status:'error',code:'200'};
        }
        else{
            if(rows.length>0){
                data={status:'exist',code:'300',name: rows[0].firstname +' '+ rows[0].lastname, user_id:rows[0].user_id};
            }
            else{
                data={status:'success',code:'400'};
            }
        }
        res.json(data);
    });
};

exports.checkProjectCode=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var data={
        code:input.code
    };
    req.models.project.find(data, function(err, rows,next) {
        if (err){
            data={status:'error',code:'200'};
        }
        else{
            if(rows.length>0){
                data={status:'exist',code:'300'};
            }
            else{
                data={status:'success',code:'400'};
            }
        }
        res.json(data);
    });
};

exports.getName=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var data={
        user_id:input.id
    };
    req.models.user.find(data, function(err, rows,next) {
        if (err){
            data={status:'error',code:'200'};
        }
        else{
            if(rows.length>0){
                data={status:'exist',code:'300',name:rows[0].firstname+' '+rows[0].lastname + '('+rows[0].email+')'};
            }
            else{
                data={status:'success',code:'400'};
            }
        }
        res.json(data);
    });
};


exports.getEmail=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var sql = 'select * from user where firstname like \'%' + input.string + '%\';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        else{
            var data;
            if(rows.length>0){
                data={names: rows};
            }
            res.json(data);
        }
    });

};
exports.count=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));


    var sql = 'select \n' +
        't.task_code,\n' +
        't.estimate,\n' +
        't.assignee_id,\n' +
        '(select firstname from user u where u.user_id = t.assignee_id) as firstname,\n' +
        '(select lastname from user u where u.user_id = t.assignee_id) as lastname,\n' +
        '(select email from user u where u.user_id = t.assignee_id) as email,\n' +
        '(select salary from user u where u.user_id = t.assignee_id) as salary,\n' +
        '(select description from status s where s.status_id = t.status_id) as status,\n' +
        '(select code from project p where p.project_id = t.project_id) as project\n' +
        'from employee.task t where status_id =  ';

    if(parseInt(input.statusflt) == 1){
        sql += '5 ';
    }else{
        sql += '6 ';
    }
    if(input.assigneeflt != '' && input.assigneeflt != undefined){
        sql += 'and `assignee_id` = (select user_id from user where email = \''+input.assigneeflt+'\') ';
    }
    if(input.projectflt != '' && input.projectflt != undefined){
        sql += 'and `project_id` = (select project_id from project where code = \''+input.projectflt+'\' ) ';
    }
    if(input.taskflt != '' && input.taskflt != undefined){
        sql += 'and `task_code` = \''+input.taskflt+'\' ';
    }
    if(input.fromflt != '' && input.fromflt != undefined){
        console.log(input.fromflt);
        var from = input.fromflt.split("-");
        var newDOB = from[2]+from[1]+from[0];
        sql += 'and `close_time` >= '+newDOB+' ';
    }
    if(input.toflt != '' && input.toflt != undefined){
        var to = input.toflt.split("-");
        var newDOB = to[2]+to[1]+to[0];
        sql += 'and `close_time` <= '+newDOB+' ';
    }

    sql+= ' order by assignee_id;'

    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            var data;
            if(rows.length >0){

                var temp = 0;
                var total = 0;
                for(i=0;i<rows.length;i++){
                    total += (parseFloat(rows[i].estimate) * parseFloat(rows[i].salary));

                }
                data={status:'exist',code:'300',total: total , detail:rows};
            }
            res.json(data);

        }
    });

};
exports.getCat=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var sql = 'select cat_name from category where cat_name like \'%' + input.string + '%\';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        else{
            var data;
            if(rows.length>0){
                data={names: rows};
            }
            res.json(data);
        }
    });

};
exports.getPrd=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var sql = 'select name from product where name like \'%' + input.string + '%\' group by name;';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        else{
            var data;
            if(rows.length>0){
                data={names: rows};
            }
            res.json(data);
        }
    });

};
exports.check_pass=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var passwd=md5(input.char);
    var sql = 'select user_id from user where password = \'' + passwd + '\';';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
        }
        else{
            var data;
            if(rows.length > 0){
                if(parseInt(rows[0].user_id) == parseInt(req.session.user_id)){
                    data={status:'exist',code:'300' , detail:rows};
                }

            }else{
                data={status:'not',code:'400',};
            }

            res.json(data);
        }
    });

};
exports.checkUser=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var data={
        username:input.username
    };
    req.models.user.find(data, function(err, rows,next) {
        if (err){
            data={status:'error',code:'200'};
        }
        else{
            if(rows.length>0){
                data={status:'exist',code:'300'};
            }
            else{
                data={status:'success',code:'400'};
            }
        }
        res.json(data);
    });
};
