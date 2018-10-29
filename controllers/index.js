var dateFormat = require('dateformat');
module.exports.home = function(req, res){
	//delete req.session;
	/*if(typeof req.session.user_id!='undefined'){
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
            data={title:req.session.firstname+' | home',fname:req.session.firstname,
                payments:rows,
                pic:req.session.pic,
                type:req.session.type,
                userid:req.session.user_id};
            res.render('home',data);

        });

	}
	else{
		data={title:'login|signup'};
		res.render('index',data);
	}*/
	
	data={title:'login|signup'};
	res.render('index',data);
};
