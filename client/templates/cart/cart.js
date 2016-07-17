
var temp_cost = 0;
var total_cost = 0;
var discount_cost = 0;
var price = 0;
Template.registerHelper('total_cart',function(){
	total_cost=0;
	//var total_items=0;
	var list_items=shoppingCart.find().fetch();

	for (var i=0; i< list_items.length; i++) {
		total_cost+=parseFloat(list_items[i].price*list_items[i].quantity);
		}
	temp_cost = total_cost;
	discount_cost = 0;
	Session.set('amount',total_cost);
	Session.set('total_discount', discount_cost);
	Session.set('final_price',temp_cost);

	return total_cost;

});

temp_cost = total_cost;
Template.registerHelper('total_quantity',function(){
	//var total_cost=0;
	var total_items=0;
	var list_items=shoppingCart.find().fetch();
	
	for (var i=0; i< list_items.length; i++) {
		total_items+=parseInt(list_items[i].quantity);
		}


	return total_items;

});

Template.registerHelper('shoppingCartItems', function(){
	return shoppingCart.find();
});

Template.cart.events({
	'submit .couponForm': function(event){
		event.preventDefault();
		var code = $('#coupon_code').val();
		//Session.set('couponCode',code);
		var x = Coupons.find({code : code}).fetch();
		var date = new Date();
		 date = moment(date).format('YYYY-MM-DD');
		//console.log(x[0].valid_till);
		// console.log(date);
		// console.log(x);
		var temp_cost = 0;
		var list_items=shoppingCart.find().fetch();
		//console.log(list_items);
		//var discount_cost = 0;
		//if(Meteor.userId()){
			if (x.length == 1){
			   if(list_items.length>0){
				if (x[0].valid_till > date){
					if(x[0].usage_count > 0){
						if(x[0].usage_per_user > 0){
						    discount = parseFloat(x[0].discount);
							
							
							for (var i=0; i< list_items.length; i++) {
								temp_cost+=parseFloat(list_items[i].price)*parseFloat(list_items[i].quantity);
								}

							 discount_cost = (temp_cost*discount)/100 ;

							temp_cost = temp_cost - (temp_cost*discount)/100 ;
							Session.set('couponCode',code);
							Session.set('total_discount', discount_cost);
							Session.set('final_price',temp_cost);
							$('#display_price').show();
							//alert('coupon code applied successfully');
							

							//shoppingCart.remove({created})
						}else{
							alert('max limit reached');
						}
					}else{
						alert("only for first 100 users")
					}
				}else{
					alert('coupon code expired');
				}
			  }else{
			  	alert('cart Empty');
			  }
			}else{
				alert("no coupon code found");
			}
		//}else{
		//	alert("please login first!!");
		//}
		//console.log(x.length);
		var discount = parseFloat(x[0].discount);
		//console.log(x[0].discount);
		
		$('#coupon_code').val('');
		//console.log(total_cost);
		//$('#display_price').show();
	},

	'click .checkout_1':function(event){
		event.preventDefault();
		Router.go('checkout');
	}
});

Template.cart.helpers({
	'final_price':function(){
		return Session.get('final_price');
	}
});

