var express = require('express');
var router = express.Router();
 
/* GET Customer page. */
 
router.get('/', function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM desk',function(err,rows){
            if(err)
            var errornya  = ("Error Selecting : %s ",err );   
            req.flash('msg_error', errornya);   
            res.render('desk/list',{title:"Desks",data:rows});
        });
        //console.log(query.sql);
    });
});
 
router.delete('/delete/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var desk = {
            id: req.params.id,
        }
        
        var delete_sql = 'delete from desk where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, desk, function(err, result){
                if(err){
                    var errors_detail  = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail); 
                    res.redirect('/desks');
                }else{
                    req.flash('msg_info', 'Delete Desk Success'); 
                    res.redirect('/desks');
                }
            });
        });
    });
});

router.get('/edit/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM desk where id='+req.params.id,function(err,rows){
            if(err){
                var errornya  = ("Error Selecting : %s ",err );  
                req.flash('msg_error', errors_detail); 
                res.redirect('/desks'); 
            }else{
                if(rows.length <=0){
                    req.flash('msg_error', "Desk can't be find!"); 
                    res.redirect('/desks');
                }else{ 
                    console.log(rows);
                    res.render('desk/edit',{title:"Edit ",data:rows[0]});
                }
            }
        });
    });
});

router.put('/edit/(:id)', function(req,res,next){
    req.assert('name', 'Please fill the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_code = req.sanitize( 'code' ).escape().trim(); 
        v_name = req.sanitize( 'name' ).escape().trim();
        v_detail = req.sanitize( 'detail' ).escape().trim();
        v_price = req.sanitize( 'price' ).escape();
        var desk = {
            code: v_code,
            name: v_name,
            detail: v_detail,
            price : v_price
        }
        var update_sql = 'update desk SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, desk, function(err, result){
                if(err){
                    var errors_detail  = ("Error Update : %s ",err );   
                    req.flash('msg_error', errors_detail); 
                    res.render('desk/edit', { 
                        code: req.param('code'), 
                        name: req.param('name'),
                        detail: req.param('detail'),
                        price: req.param('price'),
                    });
                }else{
                    req.flash('msg_info', 'Update desk success'); 
                    res.redirect('/desks/edit/'+req.params.id);
                } 
            });
        });
    }else{
        console.log(errors);
        errors_detail = "Sorry there are error <ul>";
        for (i in errors) { 
            error = errors[i]; 
            errors_detail += '<li>'+error.msg+'</li>'; 
        } 
        errors_detail += "</ul>"; 
        req.flash('msg_error', errors_detail); 
        res.render('desk/add-desk', 
        { 
            code: req.param('code'), 
            name: req.param('name')
        });
    }
});
 
router.post('/add', function(req, res, next) {
    req.assert('name', 'Please fill the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_code = req.sanitize( 'code' ).escape().trim(); 
        v_name = req.sanitize( 'name' ).escape().trim();
        v_detail = req.sanitize( 'detail' ).escape().trim();
        v_price = req.sanitize( 'price' ).escape();

        var desk = {
            code: v_code,
            name: v_name,
            detail: v_detail,
            price : v_price
        }
        
        var insert_sql = 'INSERT INTO desk SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, desk, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Insert : %s ",err );   
                    req.flash('msg_error', errors_detail); 
                    res.render('desk/add-desk', { 
                        code: req.param('code'), 
                        name: req.param('name'),
                        detail: req.param('detail'),
                        price: req.param('price'),
                    });
                }else{
                    req.flash('msg_info', 'Create desk success'); 
                    res.redirect('/desks');
                } 
            });
        });
    }else{
        console.log(errors);
        errors_detail = "Sory there are error <ul>";
        for (i in errors) { 
            error = errors[i]; 
            errors_detail += '<li>'+error.msg+'</li>'; 
        } 
        errors_detail += "</ul>"; 
        req.flash('msg_error', errors_detail); 
        res.render('desk/add-desk', 
        { 
            code: req.param('code'), 
            name: req.param('name')
        });
    }
});
 
router.get('/add', function(req, res, next) {
    res.render( 'desk/add-desk', { 
        title: 'Add New Desk',
        code: '',
        detail: '',
        price:'',
        name:''
    });
});
 
module.exports = router;
