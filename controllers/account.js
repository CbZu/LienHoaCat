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
    var userType = '';
    if(input.type == undefined){
        userType = '2';
    }else{
        userType = input.type;
    }

    var sqlCheck = 'select * from lhc.user where phone = '+input.phone +' and password <> \'akfgbksjdahfkljdash\';';
    var con = req.db.driver.db;
    con.query(sqlCheck, function (err, rows) {
        if(err){
            data={status:'err',code:'300',description:err};
            res.json(data);
        }else{
            if(rows.length > 0){
                if(input.mode == 'pay'){
                    data={status:'fail',code:'200',description:"username is exist.",user_id:rows[0].user_id};
                    res.json(data);
                } else {
                    data={status:'fail',code:'300',description:"username is exist."};
                    res.json(data);
                }

            }else{
                if(input.password.trim() == ''){
                    passwd='akfgbksjdahfkljdash';
                } else {
                    passwd=md5(input.password);
                }

                var sql = 'INSERT INTO `lhc`.`user`\n' +
                    '(`email`,\n' +
                    '`phone`,\n' +
                    '`password`,\n' +
                    '`firstname`,\n' +
                    '`create_time`,\n' +
                    '`type_id`, `username`)\n' +
                    'VALUES (\n' +
                    '\''+input.email+'\',\n' +
                    ''+input.phone+',\n' +
                    '\''+passwd+'\',\n' +
                    '\''+input.firstname+'\',\n' +
                    ''+year+''+month+''+day+',\n' +
                    ''+userType+', \''+input.phone+'\');';
                console.log(sql);
                con.query(sql, function (err, row1s) {
                    if(err){

                        data={status:'err',code:'300',description:err};
                        res.json(data);
                    }else{
                        data = {
                            user_id:row1s.insertId,
                            address:input.address
                        }
                        req.models.places.create(data, function(err, row2s) {
                            if(err){
                                data={status:'err',code:'300',description:err};
                                res.json(data);
                            }else{
                                data={status:'success',code:'200',user_id:row1s.insertId};
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
        var newDOB = input.dob.replace("-","");
        passwd=md5(input.password);

        var userType = '';
        if(input.type == undefined){
            userType = '2';
        }else{
            userType = input.type;
        }
        var dataUser = {
            email   : input.email,
            phone    : input.phone,
            firstname    : input.firstname,
            lastname : input.lastname,
            dob: input.dob.replace(/-/g,''),
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
                        '`password`,`username`,`gender`)\n' +
                        'VALUES (\n' +
                        '\''+input.email+'\',\n' +
                        ''+input.dob.replace(/-/g,'')+',\n' +
                        '\''+input.phone+'\',\n' +
                        '\''+input.firstname+'\',\n' +
                        '\'\',\n' +
                        ''+year+''+month+''+day+',\n' +
                        ''+userType+',\n' +
                        '\''+passwd+'\',\''+input.username+'\',\''+input.gender+'\');';
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
                                    data={status:'success',code:'200',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,treefolder:req.session.treefolder};
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


		});0
};
    //login
    module.exports.login_admin=function(req,res){
        var input=JSON.parse(JSON.stringify(req.body));
        var data={
            username:req.query.email,
            password:md5(req.query.password)
        };
        req.models.user.find(data, function(err, rows,next) {
            if(err){
                console.log(err);
            }else{
                if(rows.length>0){
                    req.session.firstname=rows[0].firstname.split(' ')[rows[0].firstname.split(' ').length-1];
                    req.session.lastname=rows[0].lastname;
                    req.session.user_id=rows[0].user_id;
                    req.session.type=rows[0].type_id;
                    req.session.email=rows[0].email;
                    console.log(rows);
                    var data = {
                        status : 'success',code:'200',user_id:rows[0].user_id
                    };
                    res.json(data)
                } else {
                    var data = {
                        status : 'fail',code:'404'
                    };
                    res.json(data)
                }

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
    data={title:req.session.firstname+' | Register',fname:req.session.firstname,dateFormat:dateFormat,pic:req.session.pic,type:req.session.type,treefolder:req.session.treefolder};

    res.render('register',data);
};

module.exports.show_account = function(req, res){
        //delete req.session;
        if(req.session.type=='1'
     /*       &&  (req.session.type == 1)*/){

            var sql = 'select c.user_id,c.phone,c.dob,c.gender,c.firstname,p.address,' +
                '(select count(payment_id) from payment where user_id = c.user_id and status_id in (4,5,6)) as fail ,'+
                '(select count(payment_id) from payment where user_id = c.user_id) as success ,'+
                'c.checked from user c join places p on p.user_id = c.user_id where c.password <> \'akfgbksjdahfkljdash\'';
            if( (req.query.fname != undefined &&  req.query.fname != '')
                ||  (req.query.lname != undefined &&  req.query.lname != '')
                ||  (req.query.email != undefined &&  req.query.email != '')
                ||  (req.query.type != undefined &&  req.query.type != '')){
                sql += ' where  ';
            }
            if(req.query.fname != '' && req.query.fname != undefined){
                sql += ' c.firstname = \''+req.query.fname+'\' and';
            }
            if(req.query.lname != '' && req.query.lname != undefined){
                sql += ' c.lastname = \''+req.query.lname+'\' and';
            }
            if(req.query.email != '' && req.query.email != undefined){
                sql += ' c.email = \''+req.query.email+'\' and';
            }
            if(req.query.type != '0' && req.query.type != undefined){
                sql += ' c.type_id = '+req.query.type+' and';
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
                        emailheader:req.session.email,treefolder:req.session.treefolder};
                    res.render('accounts',data);
                }


            });

        }else{
            res.redirect('/')
        }

    };

module.exports.edit_account = function(req, res){
    if(req.session.type == '1'){
        if(req.query.phone == undefined){
            var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.user_id = '+req.session.user_id+';'
        } else {
            var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.phone = \''+req.query.phone+'\';'
        }

        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(!err){
                data={title:'Edit Account | '+req.session.firstname
                    ,user:rows
                    ,fname:req.session.firstname
                    ,type:req.session.type
                    ,treefolder:req.session.treefolder};
                res.render('edit_account',data);
            }else{
                data={status:'fail',code:'300'};
            }


        });
    } else {
        var sql = 'select *,a.city,a.address,a.country  from user u join places a on a.user_id = u.user_id where u.user_id = '+req.session.user_id+';'
        var con = req.db.driver.db;
        con.query(sql, function (err, rows) {
            if(!err){
                data={title:'Edit Account | '+req.session.firstname
                    ,user:rows
                    ,fname:req.session.firstname
                    ,type:req.session.type
                    ,treefolder:req.session.treefolder};

            }else{
                data={status:'fail',code:'300'};
            }

            res.render('edit_account',data);

        });
    }


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
            if(req.session.type == '1'){
                rows.type_id = parseInt(input.type);
            }
            rows.gender = input.gender;
            rows.dob = parseInt(input.dob.replace(/-/g,''));
            rows.save(data,function(err){
                console.log('saved');

                var sql = 'update places set address = \''+input.addr+'\' , city = \''+input.city+'\' , country = \''+input.country+'\' where user_id = '+input.id+';'
                var con = req.db.driver.db;
                con.query(sql);
            });
        }

    });
    if(req.session.type == 1){
        res.redirect('/maintenance');
    }else{
        res.redirect('/');
    }


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