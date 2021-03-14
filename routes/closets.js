var express = require('express');
var router = express.Router();
 
/* GET Customer page. */
 
router.get('/', function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM closet',function(err,rows){
            if(err)
            var errornya  = ("Error Selecting : %s ",err );   
            req.flash('msg_error', errornya);   
            res.render('closet/list',{title:"Closet",data:rows});
        });
        //console.log(query.sql);
    });
});
 
router.delete('/delete/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var closet = {
            id: req.params.id,
        }
        
        var delete_sql = 'delete from closet where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, closet, function(err, result){
                if(err){
                    var errors_detail  = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail); 
                    res.redirect('/closets');
                }else{
                    req.flash('msg_info', 'Delete Closet Success'); 
                    res.redirect('/closets');
                }
            });
        });
    });
});

router.get('/edit/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM closet where id='+req.params.id,function(err,rows){
            if(err){
                var errornya  = ("Error Selecting : %s ",err );  
                req.flash('msg_error', errors_detail); 
                res.redirect('/closets'); 
            }else{
                if(rows.length <=0){
                    req.flash('msg_error', "Desk can't be find!"); 
                    res.redirect('/closets');
                }else{ 
                    console.log(rows);
                    res.render('closet/edit',{title:"Edit ",data:rows[0]});
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
        var closet = {
            code: v_code,
            name: v_name,
            detail: v_detail,
            price : v_price
        }
        var update_sql = 'update closet SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, closet, function(err, result){
                if(err){
                    var errors_detail  = ("Error Update : %s ",err );   
                    req.flash('msg_error', errors_detail); 
                    res.render('closet/edit', { 
                        code: req.param('code'), 
                        name: req.param('name'),
                        detail: req.param('detail'),
                        price: req.param('price'),
                    });
                }else{
                    req.flash('msg_info', 'Update closet success'); 
                    res.redirect('/closets/edit/'+req.params.id);
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
        res.render('closet/add-closet', 
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

        var closet = {
            code: v_code,
            name: v_name,
            detail: v_detail,
            price : v_price
        }
        
        var insert_sql = 'INSERT INTO closet SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, closet, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Insert : %s ",err );   
                    req.flash('msg_error', errors_detail); 
                    res.render('closet/add-closet', { 
                        code: req.param('code'), 
                        name: req.param('name'),
                        detail: req.param('detail'),
                        price: req.param('price'),
                    });
                }else{
                    req.flash('msg_info', 'Create desk success'); 
                    res.redirect('/closets');
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
        res.render('closet/add-closet', 
        { 
            code: req.param('code'), 
            name: req.param('name')
        });
    }
});
 
router.get('/add', function(req, res, next) {
    res.render( 'closet/add-closet', { 
        title: 'Add New Closet',
        code: '',
        detail: '',
        price:'',
        name:''
    });
});
 
module.exports = router;
