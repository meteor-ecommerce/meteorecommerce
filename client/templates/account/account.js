// all function calls are defined in methods.js file //

// Template.account.onRendered(function(){
//
// 	//console.log(Ordered.find().fetch());
//
// });

Template.account.helpers({
	"order_list" :function(){
		var accountDetails = [];
		//console.log(accountDetails)
		var len1 = Ordered.find().count();
		var prod = Ordered.find().fetch();
		//console.log(len1);
		//console.log(prod);
		for(var i=0 ; i<len1;i++){
			var len2 = Ordered.find().fetch()[i].products.length;
			for(var j=0;j<len2;j++){
				var obj = {};
				obj.name = prod[i].products[j].id;
				obj.quantity = prod[i].products[j].quantity;
				obj.price = prod[i].products[j].price;
				accountDetails.push(obj);
			}

		}
		//console.log(accountDetails);
		return accountDetails;
	},



});
