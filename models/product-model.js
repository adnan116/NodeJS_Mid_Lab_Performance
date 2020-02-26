var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from product where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByPname: function(pname, callback){
		var sql = "select * from product where name=?";
		db.getResult(sql, [pname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from product";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(product, callback){
		var sql = "insert into product values(?,?,?,?)";
		db.execute(sql, [null, product.name, product.quantity, product.price], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from product where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(product, callback){
		var sql = "update product set name=?, quantity=?, price=? where id=?";
		db.execute(sql, [product.name, product.quantity, product.price, product.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}