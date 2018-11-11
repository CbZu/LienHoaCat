	var md5 = require('MD5');
    var dateFormat = require('dateformat');
//signup
module.exports.signup=function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));

    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var year = date.getUTCFullYear();

	var dt_join=Math.round(+new Date()/1000);
	var birth = input.dob.split("/");
	var newDOB = birth[2]+birth[0]+birth[1];
		passwd=md5(input.password);
		var dataUser = {
            email   : input.email,
            phone    : input.phone,
            firstname    : input.firstname,
            lastname : input.lastname,
            dob:newDOB,
            password:passwd,
            create_time:parseInt(year+''+month+''+day),
			type_id : parseInt(input.type)
		};
        var sqlCheck = 'select * from user where username = \''+input.username+'\'';
        var con = req.db.driver.db;
    con.query(sqlCheck, function (err, rows) {
        if(err){
            data={status:'err',code:'300',description:err};
            res.json(data);
        }else{
            if(rows.length > 0){
                data={status:'fail',code:'300',description:"username is exist."};
                res.json(data);
            }else{
                var sql = 'INSERT INTO `user`\n' +
                    '(`email`,\n' +
                    '`dob`,\n' +
                    '`phone`,\n' +
                    '`firstname`,\n' +
                    '`lastname`,\n' +
                    '`create_time`,\n' +
                    '`type_id`,\n' +
                    '`password`,`username`,`bank`,`bank_account`,`bank_address`)\n' +
                    'VALUES (\n' +
                    '\''+input.email+'\',\n' +
                    ''+newDOB+',\n' +
                    ''+input.phone+',\n' +
                    '\''+input.firstname+'\',\n' +
                    '\''+input.lastname+'\',\n' +
                    ''+year+''+month+''+day+',\n' +
                    ''+input.type+',\n' +
                    '\''+passwd+'\',\''+input.username+'\',\''+input.bank+'\', \''+input.bank_account+'\' , \''+input.bank_address+'\');';
                console.log(sql);
                con.query(sql, function (err, row1s) {
                    if(err){
                        data={status:'err',code:'300',description:err};
                        res.json(data);
                    }else{
                        data = {
                            user_id:row1s.insertId,
                            address:input.address,
                            city:input.city,
                            country:input.country
                        }
                        req.models.places.create(data, function(err, row2s) {
                            if(err){
                                data={status:'err',code:'300',description:err};
                                res.json(data);
                            }else{
                                data={status:'success',code:'200',user_id:row1s.user_id};
                                res.json(data);
                            }

                        });

                    }
                });
            }


        }
    });



};
    module.exports.signup_admin=function(req,res){
        var input = JSON.parse(JSON.stringify(req.body));

        var date = new Date();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        var year = date.getUTCFullYear();

        var dt_join=Math.round(+new Date()/1000);
        var birth = input.dob.split("/");
        var newDOB = birth[2]+birth[0]+birth[1];
        passwd=md5(input.password);
        var dataUser = {
            email   : input.email,
            phone    : input.phone,
            firstname    : input.firstname,
            lastname : input.lastname,
            dob:newDOB,
            password:passwd,
            create_time:parseInt(year+''+month+''+day),
            type_id : parseInt(input.type)
        };
        var sqlCheck = 'select * from lhc.user where username = \''+input.username+'\'';
        var con = req.db.driver.db;
        con.query(sqlCheck, function (err, rows) {
            if(err){
                data={status:'err',code:'300',description:err};
                res.json(data);
            }else{
                if(rows.length > 0){
                    data={status:'fail',code:'300',description:"username is exist."};
                    res.json(data);
                }else{
                    var sql = 'INSERT INTO `lhc`.`user`\n' +
                        '(`email`,\n' +
                        '`dob`,\n' +
                        '`phone`,\n' +
                        '`firstname`,\n' +
                        '`lastname`,\n' +
                        '`create_time`,\n' +
                        '`type_id`,\n' +
                        '`password`,`username`,`bank`,`bank_account`,`bank_address`)\n' +
                        'VALUES (\n' +
                        '\''+input.email+'\',\n' +
                        ''+newDOB+',\n' +
                        ''+input.phone+',\n' +
                        '\''+input.firstname+'\',\n' +
                        '\''+input.lastname+'\',\n' +
                        ''+year+''+month+''+day+',\n' +
                        ''+input.type+',\n' +
                        '\''+passwd+'\',\''+input.username+'\',\''+input.bank+'\', \''+input.bank_account+'\' , \''+input.bank_address+'\');';
                    console.log(sql);
                    con.query(sql, function (err, row1s) {
                        if(err){
                            data={status:'err',code:'300',description:err};
                            res.json(data);
                        }else{
                            data = {
                                user_id:row1s.insertId,
                                address:input.address,
                                city:input.city,
                                country:input.country
                            }
                            req.models.places.create(data, function(err, row2s) {
                                if(err){
                                    data={status:'err',code:'300',description:err};
                                    res.json(data);
                                }else{
                                    data={status:'success',code:'200'};
                                   res.render('register',data);
                                }

                            });

                        }
                    });
                }


            }
        });



    };
//login
module.exports.login=function(req,res){
	var input=JSON.parse(JSON.stringify(req.body));
    var data={
			email:input.email,
			password:md5(input.password)
		};
	req.models.user.find(data, function(err, rows,next) {
		if(rows.length>0){
            var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.user_id = '+rows[0].user_id+';'
            var con = req.db.driver.db;
            con.query(sql, function (err, row1s) {
                if(!err){
                    data={status:'success',code:'200',result:row1s};
                    res.json(data);
                }else{
                    data={status:'fail',code:'300'};
                    res.json(data);
                }


            });
		}else{
            data={status:'fail',code:'300'};
            res.json(data);
        }


		});
};
    //login
    module.exports.login_admin=function(req,res){
        var input=JSON.parse(JSON.stringify(req.body));
        var data={
            username:input.email,
            password:md5(input.password)
        };
        req.models.user.find(data, function(err, rows,next) {
            if(err){
                console.log(err);
            }else{
                if(rows.length>0){
                    req.session.firstname=rows[0].firstname;
                    req.session.lastname=rows[0].lastname;
                    req.session.user_id=rows[0].user_id;
                    req.session.type=rows[0].type_id;
                    req.session.email=rows[0].email;
                    console.log(rows);
                }/*else{
                    var data={
                        username:input.email,
                        password:md5(input.password)
                    };
                    req.models.user.find(data, function(err, row1s,next) {
                        if(row1s.length>0){
                            req.session.firstname=row1s[0].firstname;
                            req.session.lastname=row1s[0].lastname;
                            req.session.user_id=row1s[0].user_id;
                            req.session.type=row1s[0].type_id;
                            req.session.email=row1s[0].email;
                            console.log(row1s);
                        }
                    });
                }*/
                res.redirect('/');
            }


        });
    };
    module.exports.get_user=function(req,res){
        var input=JSON.parse(JSON.stringify(req.body));
        var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.user_id = '+input.user+';'
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(!err){
                data={status:'success',code:'200',result:rows};
            }else{
                data={status:'fail',code:'300'};
            }

            res.json(data);

        });
    };
//logout
module.exports.logout=function(req,res){
	delete req.session;
	res.redirect('/');
};

module.exports.register=function(req,res){
    data={title:req.session.firstname+' | Register',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type};

    res.render('register',data);
};

module.exports.show_account = function(req, res){
        //delete req.session;
        if(req.session.type=='1'
     /*       &&  (req.session.type == 1)*/){

            var sql = 'select * from user ';
            if( (req.query.fname != undefined &&  req.query.fname != '')
                ||  (req.query.lname != undefined &&  req.query.lname != '')
                ||  (req.query.email != undefined &&  req.query.email != '')
                ||  (req.query.type != undefined &&  req.query.type != '')){
                sql += ' where  ';
            }
            if(req.query.fname != '' && req.query.fname != undefined){
                sql += ' firstname = \''+req.query.fname+'\' and';
            }
            if(req.query.lname != '' && req.query.lname != undefined){
                sql += ' lastname = \''+req.query.lname+'\' and';
            }
            if(req.query.email != '' && req.query.email != undefined){
                sql += ' email = \''+req.query.email+'\' and';
            }
            if(req.query.type != '0' && req.query.type != undefined){
                sql += ' type_id = '+req.query.type+' and';
            }

            if( (req.query.fname != undefined &&  req.query.fname != '')
                ||  (req.query.lname != undefined &&  req.query.lname != '')
                ||  (req.query.email != undefined &&  req.query.email != '')
                ||  (req.query.type != undefined &&  req.query.type != '0')){
                sql = sql.substring(0,sql.length-3);
            }
            console.log(sql);
            var con = req.db.driver.db;
            con.query(sql, function (err, rows) {
                if(err){
                    console.log(err);
                    res.redirect('/maintenance')
                }else{
                    data={title:req.session.firstname+' | home',fname:req.session.firstname,users:rows,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,
                        fnameflt:req.query.fname,
                        lnameflt:req.query.lname,
                        emailflt:req.query.email,
                        typeflt:req.query.type,
                        emailheader:req.session.email,};
                    res.render('accounts',data);
                }


            });

        }else{
            res.redirect('/')
        }

    };

module.exports.edit_account = function(req, res){
    var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.email = \''+req.query.email+'\';'
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(!err){
            data={title:'Edit Account | '+req.session.firstname,fname:req.session.firstname,user:rows};
            res.render('edit_account',data);
        }else{
            data={status:'fail',code:'300'};
        }

        res.render('edit_account',data);

    });

    };
module.exports.save_account = function(req, res){
    var input=JSON.parse(JSON.stringify(req.body));
        req.models.user.get(input.id,function(err,rows){
            if(err){
                console.log(err);
            }
            else{
                var date = new Date();
                var month = date.getMonth() + 1;
                month = (month < 10 ? "0" : "") + month;

                var day  = date.getDate();
                day = (day < 10 ? "0" : "") + day;
                var year = date.getUTCFullYear();

                var dt_join=Math.round(+new Date()/1000);
                var birth = input.dob.split("/");
                var newDOB = birth[2]+birth[1]+birth[0];
                rows.email   = input.email;
                rows.phone    = input.phone;
                rows.firstname    = input.fname;
                rows.lastname = input.lname;
                rows.salary=parseFloat(input.salary);
                rows.type_id = parseInt(input.type);
                rows.country = input.country;
                rows.city = input.city;
                rows.address = input.addr;
                rows.dob = parseInt(newDOB);
                rows.save(data,function(err){
                    console.log('saved');
                });
            }
            if(req.session.type == 1){
                res.redirect('/maintenance');
            }else{
                res.redirect('/');
            }

        });


};
    module.exports.reset_password = function(req, res){

            req.models.user.find({user_id:req.query.id},function(err,rows){
                if(err){
                    console.log(err);
                }
                else{
                    data={title:'Reset Password | '+req.session.firstname,fname:req.session.firstname,user:rows,type:req.session.type};
                    res.render('reset_password',data);

                }
            });



    };


    module.exports.update_password = function(req, res){
        var input=JSON.parse(JSON.stringify(req.body));
        var passwd=md5(input.newPassword);
        var sql = 'update user set password = \''+passwd+'\' where user_id = '+input.userid + ';';
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(err){
                console.log(err);
                res.redirect('/')
            }else{
                if(req.session.type == 1){
                    res.redirect('/maintenance');
                }else{
                    res.redirect('/');
                }
            }


        });





    };