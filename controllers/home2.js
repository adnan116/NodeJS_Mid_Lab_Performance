var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var productModel   = require.main.require('./models/product-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	
	userModel.getByUname(req.cookies['username'], function(result){
	res.render('home/home2', {user: result});
	});
	
});

router.get('/productadd', function(req, res){
	res.render('home/productadd');
})

router.post('/productadd', function(req, res){
	
	var product = {
		name: req.body.pname,
		quantity: req.body.quantity,
		price: req.body.price
	};

	productModel.insert(product, function(status){
		if(status){
			res.redirect('/home2/allproduct');
		}else{
			res.redirect('/home2/productadd');
		}
	});
})

router.get('/allproduct', function(req, res){
	productModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/allproduct', {productlist: results});
		}else{
			res.send('Null Value');
		}
	});
})

router.get('/productedit/:id', function(req, res){
	
	productModel.getById(req.params.id, function(result){
		res.render('home/productedit', {product: result});
	});
})

router.post('/productedit/:id', function(req, res){
	
	var product = {
		name: req.body.pname,
		quantity: req.body.quantity,
		price: req.body.price,
		id: req.params.id
	};

	productModel.update(product, function(status){
		if(status){
			res.redirect('/home2/allproduct');
		}else{
			res.redirect('/home2/productedit/'+req.params.id);
		}
	});
})


router.get('/productdelete/:id', function(req, res){
	
	productModel.getById(req.params.id, function(result){
		res.render('home/productdelete', {product: result});
	});
})

router.post('/productdelete/:id', function(req, res){
	
	productModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home2/allproduct');
		}else{
			res.redirect('/home2/productdelete/'+req.params.id);
		}
	});
})


module.exports = router;

