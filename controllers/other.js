module.exports.export_excel=function(req,res){
	var nodeExcel=require('excel-export');
	var dateFormat = require('dateformat');
	var conf={}
	conf.cols=[{
			caption:'PROJECT',
			type:'string',
			width:50
		},
		{
			caption:'TASK',
			type:'string',
			width:10
		},
		{
			caption:'ASSIGNEE',
			type:'string',
			width:50
		},
        {
            caption:'REPORTER',
            type:'String',
            width:50
        },
        {
            caption:'APPROVED',
            type:'String',
            width:50
        },
        {
            caption:'STATUS',
            type:'String',
            width:50
        }
		];

    var sql = 'select t.task_id,t.task_code,t.approved,\n' +
        '(select p.project_name from project p where p.project_id = t.project_id) as project,\n' +
        '(select u.firstname from user u where u.user_id = t.assignee_id) as assignee_fname,\n' +
        '(select u.lastname from user u where u.user_id = t.assignee_id) as assignee_lname,\n' +
        '(select u.firstname from user u where u.user_id = t.reporter_id) as reporter_fname,\n' +
        '(select u.lastname from user u where u.user_id = t.reporter_id) as reporter_lname,\n' +
        '(select s.description from status s where s.status_id = t.status_id) as status\n' +
        'from employee.task t order by project,task_id';
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            if(rows.length >0){
                arr=[];
                arr.push(['','','','','','']);
                var temp = '';
                for(i=0;i<rows.length;i++){
                    var a;
                    if(temp != ''){
                        if(temp == rows[i].project){
                            a=['',rows[i].task_code,rows[i].assignee_fname==null?'':(rows[i].assignee_fname+' '+rows[i].assignee_lname),rows[i].reporter_fname==null?'':(rows[i].reporter_fname+' '+rows[i].reporter_lname),rows[i].approved,rows[1].status];
                        }else{
                            a=[rows[i].project,rows[i].task_code,rows[i].assignee_fname==null?'':(rows[i].assignee_fname+' '+rows[i].assignee_lname),rows[i].reporter_fname==null?'':(rows[i].reporter_fname+' '+rows[i].reporter_lname),rows[i].approved,rows[1].status];
                        }
                    }else{
                        temp = rows[i].project == null?'':rows[i].project;
                        a=[rows[i].project,rows[i].task_code,rows[i].assignee_fname==null?'':(rows[i].assignee_fname+' '+rows[i].assignee_lname),rows[i].reporter_fname==null?'':(rows[i].reporter_fname+' '+rows[i].reporter_lname),rows[i].approved,rows[1].status];
                    }

                    arr.push(a);
                }
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"project.xlsx");
                res.end(result,'binary');
            }

        }
    });

};

module.exports.export_excel_user=function(req,res){
    var nodeExcel=require('excel-export');
    var dateFormat = require('dateformat');
    var conf={}
    conf.cols=[{
            caption:'NAME',
            type:'string',
            width:50
        },
        {
            caption:'BIRTHDAY',
            type:'string',
            width:30
        },
        {
            caption:'EMAIL',
            type:'string',
            width:50
        },
        {
            caption:'PHONE',
            type:'String',
            width:50
        },
        {
            caption:'SALARY',
            type:'String',
            width:50
        },
        {
            caption:'CREATED DATE',
            type:'String',
            width:50
        },
        {
            caption:'TYPE',
            type:'String',
            width:50
        }
    ];

    var sql = 'select *,\n' +
        '(select t.description from type t where t.type_id = u.type_id) as type\n' +
        'from employee.user u ';
    if( (req.query.fname != undefined &&  req.query.fname != '')
        ||  (req.query.lname != undefined &&  req.query.lname != '')
        ||  (req.query.email != undefined &&  req.query.email != '')
        ||  (req.query.type != undefined &&  req.query.type != '0')){
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
    if(req.query.type != '0' && req.query.type != undefined ){
        sql += ' type_id = '+req.query.type+' and';
    }
    if( (req.query.fname != undefined &&  req.query.fname != '')
        ||  (req.query.lname != undefined &&  req.query.lname != '')
        ||  (req.query.email != undefined &&  req.query.email != '')
        ||  (req.query.type != undefined &&  req.query.type != '0' )){
        sql = sql.substring(0,sql.length-3);
    }
    console.log(sql);
    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            if(rows.length >0){
                arr=[];
                arr.push(['','','','','','','']);
                var temp = '';
                for(i=0;i<rows.length;i++){
                    a=[rows[i].firstname+' '+rows[i].lastname,
                        rows[i].dob.toString().substring(6,8)+'/'+rows[i].dob.toString().substring(4,6)+'/'+rows[i].dob.toString().substring(0,4),
                        rows[i].email,
                        rows[i].phone,
                        rows[i].salary,
                        rows[i].create_time.toString().substring(6,8)+'/'+rows[i].create_time.toString().substring(4,6)+'/'+rows[i].create_time.toString().substring(0,4),
                        rows[i].type];
                    arr.push(a);
                }
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"user.xlsx");
                res.end(result,'binary');
            }

        }
    });

};
module.exports.export_excel_count=function(req,res){
    var nodeExcel=require('excel-export');
    var dateFormat = require('dateformat');
    var conf={}
    conf.cols=[{
        caption:'NO.',
        type:'string',
        width:10
    },

        {
            caption:'DATE START TASK',
            type:'string',
            width:30
        },

        {
            caption:'ENGINEER',
            type:'String',
            width:30
        },

        {
            caption:'EMAIL',
            type:'String',
            width:30
        },
        {
            caption:'CUSTOMER',
            type:'String',
            width:30
        },
        {
            caption:'PROJECT CODE',
            type:'String',
            width:10
        },
        {
            caption:'TASK CODE',
            type:'String',
            width:10
        },
        {
            caption:'PROJECT',
            type:'String',
            width:30
        },
        {
            caption:'REF NAME',
            type:'String',
            width:30
        },
        {
            caption:'ACTIVITY',
            type:'String',
            width:30
        },
        {
            caption:'DESCRIPTION',
            type:'String',
            width:30
        },
        {
            caption:'STATUS',
            type:'String',
            width:10
        },
        {
            caption:'ESTIMATE',
            type:'String',
            width:10
        },
        {
            caption:'SALARY/HOUR',
            type:'String',
            width:10
        },
        {
            caption:'TOTAL',
            type:'String',
            width:10
        },
        {
            caption:'PAID(Y/N)',
            type:'String',
            width:5
        },
        {
            caption:'BILLED(Y/N)',
            type:'String',
            width:5
        },
        {
            caption:'DATE BILLED',
            type:'String',
            width:20
        }

    ];

    var sql = 'select \n' +
        '(select DATE_FORMAT(STR_TO_DATE((select create_time from task where task_id = t.task_id), \'%Y%m%d\'), \'%m/%d/%Y\')) as start_date,\n' +
        '(select concat(u.firstname,\' \',u.lastname) from user u where u.user_id = t.assignee_id) as engineer,\n' +
        '(select email from user u where u.user_id = t.assignee_id) as email,\n' +
        '(select concat(u.firstname,\' \',u.lastname)  from user u join project p on u.user_id = p.customer_id where p.project_id = t.project_id) as customer,\n' +
        '(select code from project where project_id = t.project_id) as project_code,\n' +
        '(select project_name from project where project_id = t.project_id) as project_name,\n' +
        't.task_code,\n' +
        '(select description from refname where ref_id = t.ref_id) as ref_name,\n' +
        '(select description from activity where activity_id = t.activity_id) as activity_name,\n' +
        't.description,\n' +
        '(select description from status where status_id = t.status_id) as status,\n' +
        't.estimate,\n' +
        '(select salary from user u where u.user_id = t.assignee_id) as salary,\n' +
        '(select estimate*salary) as total,\n' +
        '(select DATE_FORMAT(STR_TO_DATE((t.bill_date), \'%Y%m%d\'), \'%m/%d/%Y\')) as bill_date\n' +
        'from task t where status_id = ';
        if(parseInt(req.query.statusflt) == 1){
            sql += '5 ';
        }else{
            sql += '6 ';
        }
    if(req.query.assigneeflt != '' && req.query.assigneeflt != undefined){
        sql += 'and `assignee_id` = (select user_id from user where email = \''+req.query.assigneeflt+'\') ';
    }
    if(req.query.projectflt != '' && req.query.projectflt != undefined){
        sql += 'and `project_id` = (select project_id from project where code = \''+req.query.projectflt+'\' ) ';
    }
    if(req.query.taskflt != '' && req.query.taskflt != undefined){
        sql += 'and `task_code` = \''+req.query.taskflt+'\' ';
    }
    if(req.query.fromflt != '' && req.query.fromflt != undefined){
        var from = req.query.fromflt.split("/");
        var newDOB = from[2]+from[1]+from[0];
        sql += 'and `close_time` >= '+newDOB+' ';
    }
    if(req.query.toflt != '' && req.query.toflt != undefined){
        var to = req.query.toflt.split("/");
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
            if(rows.length >0){
                arr=[];
                arr.push(['','','','','','','','','','','','','','','','','','','','','']);
                var temp = 0;
                var total = 0;
                for(i=0;i<rows.length;i++){
                    a=[i+1,
                        rows[i].start_date,
                        rows[i].engineer,
                        rows[i].email,
                        rows[i].customer,
                        rows[i].project_code,
                        rows[i].project_name,
                        rows[i].task_code,
                        rows[i].ref_name,
                        rows[i].activity_name,
                        rows[i].description,
                        rows[i].status,
                        rows[i].estimate,
                        rows[i].salary,
                        rows[i].total,
                        rows[i].status =='Paid'?'Y':'N',
                        rows[i].status =='Paid'?'Y':'N',
                        rows[i].bill_date==null?' ':rows[i].bill_date];
                    /*if(temp != 0){
                        if(temp == parseInt(rows[i].assignee_id)){
                            a=['',
                                '',
                                '',
                                rows[i].project,
                                rows[i].task_code,
                                rows[i].status,
                                rows[i].estimate];
                        }else{
                            temp = parseInt(rows[i].assignee_id);
                            a=[rows[i].firstname+' '+rows[i].lastname,
                                rows[i].email,
                                rows[i].salary,
                                rows[i].project,
                                rows[i].task_code,
                                rows[i].status,
                                rows[i].estimate];
                        }
                    }else{
                        temp = parseInt(rows[i].assignee_id);
                        a=[rows[i].firstname+' '+rows[i].lastname,
                            rows[i].email,
                            rows[i].salary,
                            rows[i].project,
                            rows[i].task_code,
                            rows[i].status,
                            rows[i].estimate];

                    }
                    total += (parseFloat(rows[i].estimate) * parseFloat(rows[i].salary));*/
                    arr.push(a);
                }
               /* arr.push(['','','','','','Total: ',total +' USD']);*/
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"user.xlsx");
                res.end(result,'binary');
            }else{
                arr=[];
                arr.push(['','','','','',' ',' ']);
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"user.xlsx");
                res.end(result,'binary');
            }

        }
    });

};


module.exports.paid=function(req,res){
    var nodeExcel=require('excel-export');
    var dateFormat = require('dateformat');
    var conf={}
    conf.cols=[{
        caption:'NAME',
        type:'string',
        width:30
    },

        {
            caption:'EMAIL',
            type:'string',
            width:30
        },

        {
            caption:'SALARYT/HOUR (USD)',
            type:'String',
            width:30
        },

        {
            caption:'POROJECT',
            type:'String',
            width:50
        },{
            caption:'TASK CODE',
            type:'String',
            width:20
        },
        {
            caption:'STATUS',
            type:'String',
            width:10
        },
        {
            caption:'ESTIMATE (HOUR)',
            type:'String',
            width:10
        }

    ];

    var sql = 'select *,\n' +
        '(select firstname from user u where u.user_id = t.assignee_id) as firstname,\n' +
        '(select lastname from user u where u.user_id = t.assignee_id) as lastname,\n' +
        '(select email from user u where u.user_id = t.assignee_id) as email,\n' +
        '(select salary from user u where u.user_id = t.assignee_id) as salary,\n' +
        '(select description from status s where s.status_id = t.status_id) as status,\n' +
        '(select code from project p where p.project_id = t.project_id) as project\n' +
        'from employee.task t where status_id = 5 ';

    if(req.query.assigneeflt != '' && req.query.assigneeflt != undefined){
        sql += 'and `assignee_id` = (select user_id from user where email = \''+req.query.assigneeflt+'\') ';
    }
    if(req.query.projectflt != '' && req.query.projectflt != undefined){
        sql += 'and `project_id` = (select project_id from project where code = \''+req.query.projectflt+'\' ) ';
    }
    if(req.query.taskflt != '' && req.query.taskflt != undefined){
        sql += 'and `task_code` = \''+req.query.taskflt+'\' ';
    }
    if(req.query.fromflt != '' && req.query.fromflt != undefined){
        var from = req.query.fromflt.split("/");
        var newDOB = from[2]+from[1]+from[0];
        sql += 'and `close_time` >= '+newDOB+' ';
    }
    if(req.query.toflt != '' && req.query.toflt != undefined){
        var to = req.query.toflt.split("/");
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
            if(rows.length >0){
                var date = new Date();
                var month = date.getMonth() + 1;
                month = (month < 10 ? "0" : "") + month;

                var day  = date.getDate();
                day = (day < 10 ? "0" : "") + day;
                var year = date.getUTCFullYear();

                for(i=0;i<rows.length;i++){

                    var sqlUpdate = 'update employee.task set status_id = 6 , bill_date = '+parseInt(year+''+month+''+day) +' where task_id = '+rows[i].task_id+';';
                    con.query(sqlUpdate, function (err, rows) {
                        if(err){
                            console.log(err);
                            res.redirect('/');
                        }

                        });
                }

            }

        }
    });

};

module.exports.project_payment=function(req,res){
    var nodeExcel=require('excel-export');
    var dateFormat = require('dateformat');
    var conf={}
    conf.cols=[{
        caption:'No.',
        type:'string',
        width:10
    },

        {
            caption:'DATE START PROJECT',
            type:'string',
            width:30
        },

        {
            caption:'NAME',
            type:'String',
            width:30
        },

        {
            caption:'CUSTOMER',
            type:'String',
            width:30
        },
        {
            caption:'NUMBER OF TASK',
            type:'String',
            width:10
        },
        {
            caption:'TASK APPROVED',
            type:'String',
            width:10
        },
        {
            caption:'TASK IS NOT APPROVED',
            type:'String',
            width:10
        },
        {
            caption:'DATE',
            type:'String',
            width:30
        },
        {
            caption:'TOTAL (USD)',
            type:'String',
            width:10
        }

    ];

    var sql = 'SELECT p.project_id ,\n' +
        '(select DATE_FORMAT(STR_TO_DATE((select min(create_time) from task where project_id = p.project_id), \'%Y%m%d\'), \'%m/%d/%Y\')) as start_date,\n' +
        'p.project_name,\n' +
        '(select concat(firstname,\' \',lastname) from user where user_id = p.customer_id) as customer,\n' +
        '(select count(task_id) from task where project_id = p.project_id ) as tasks,\n' +
        '(select count(task_id) from task where project_id = p.project_id and approved = \'Y\') as task_approved,\n' +
        '(select count(task_id) from task where project_id = p.project_id and approved = \'N\') as task_not_approved,\n' +
        '(select DATE_FORMAT(STR_TO_DATE((SELECT CURDATE()+0), \'%Y%m%d\'), \'%m/%d/%Y\')) as date,\n' +
        '(select sum(t.estimate*(select salary from user where user_id = t.assignee_id)) from task t where t.project_id = p.project_id and t.approved = \'Y\') as total\n' +
        'from project p right join  task t on p.project_id = t.project_id group by project_id;';


    var con = req.db.driver.db;
    con.query(sql, function (err, rows) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            if(rows.length >0){
                arr=[];
                arr.push(['','','','','','','','','']);
                for(i=0;i<rows.length;i++){
                    a=[i+1,
                        rows[i].start_date,
                        rows[i].project_name,
                        rows[i].customer,
                        rows[i].tasks,
                        rows[i].task_approved,
                        rows[i].task_not_approved,
                        rows[i].date,
                        rows[i].total]
                    arr.push(a);
                }
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"project-payment.xlsx");
                res.end(result,'binary');
            }else{
                arr=[];
                arr.push(['','','','','',' ',' ']);
                conf.rows=arr;
                var result=nodeExcel.execute(conf);
                res.setHeader('Content-Type','application/vnd.openxmlformates');
                res.setHeader("Content-Disposition","attachment;filename="+"project-payment.xlsx");
                res.end(result,'binary');
            }

        }
    });

};
