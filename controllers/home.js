var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	
	userModel.getByUname(req.cookies['username'], function(result){
	res.render('home/index', {user: result});
	});
	
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('Null Value');
		}
	});
})

router.get('/add', function(req, res){
	res.render('home/add');
})

router.post('/add', function(req, res){
	
	var user = {
		name: req.body.name,
		contact: req.body.contact,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/add');
		}
	});
})


router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		name: req.body.name,
		contact: req.body.contact,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

module.exports = router;

