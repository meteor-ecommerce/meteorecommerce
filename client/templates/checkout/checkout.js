Template.checkout.events({
	'submit .checkoutForm':function(event){
		event.preventDefault();
		var ip;
		$.getJSON("http://jsonip.com/?callback=?", function (data) {
	        //console.log(data);
	        ip = data.ip;
	        //alert(data.ip);
	    });
		var obj = {};
		obj.name = $('#name').val();
		obj.email = $('#email').val();
		obj.contact = $('#contact_number').val();
		obj.house = $('#house').val();
		obj.street = $('#street').val();
		obj.landmark = $('#landmark').val();
		obj.city = $('#city').val();
		obj.pin = $('#pin').val();
		obj.state = $('#state').val();
		//obj.check = $('.checkoutForm input[type="radio"]:checked').val();
		var chec = $('.checkoutForm input[type="radio"]:checked').val();
		//console.log(chec);
		var cart = shoppingCart.find().fetch();
		
		//console.log(cart);
		var prod = [];
		var coupon = Session.get('couponCode');
		if (typeof coupon == 'undefined')
			coupon = "notApplied";
		//console.log(coupon);
		var owner;
		if(!Meteor.userId()){
            owner = "guest";
        }else{
            owner = Meteor.userId();
        }
		var productId = [];
		var productQty = [];
		for(var i=0;i<cart.length;i++){
			obj1 = {};
			obj1.id = cart[i].prodId;
			obj1.price = cart[i].price;
			obj1.quantity = cart[i].quantity;
			productId.push(cart[i].prodId);
			productQty.push(cart[i].quantity);
			prod.push(obj1);
		}

		//console.log(prod);
		if(chec == 'COD'){	

			Meteor.call('insert_ordered_data',prod,ip,obj,productQty,productId,coupon,1,chec,function(error,result){
				if(error){
					//console.log(error.reason);
				}else{
					console.log('done');
					console.log(result);
					Session.set('res',result);
					
				}
				Router.go('success');
			});


		}else if(chec== 'credit'){
			Meteor.call('insert_ordered_data',prod,ip,obj,productQty,productId,coupon,2,chec,function(error,result){
				if(error){
					//console.log(error.reason);
				}else{
					// console.log('done');
					// console.log(result);
					Session.set('res',result);
			
			//console.log(coupon);
			Meteor.call('paymentRequest',productId,productQty,coupon,obj.name,obj.email,obj.contact,result,function(error,result){
				if(error){
					//console.log(error);
				}else{
					//console.log(result);
					window.location = result;
				}
			});
				}
			});
		}
		
		//console.log(Session.get('res'));
	    
	    //console.log(obj);
	    //console.log(ip);
	    //console.log(chec);

		


		$('#name').val('');
		$('#email').val('');
		$('#contact_number').val('');
		$('#house').val('');
		$('#street').val('');
		$('#landmark').val('');
		$('#city').val('');
		$('#pin').val('');
		$('#state').val('');
		//event.preventDefault();
		
		
	},

	
});
Template.checkout.helpers({
	'amount':function(){
		var x = Session.get('amount');
		return x;
	},
	'final_discount':function(){
		return Session.get('total_discount');
	},
	'final_amount':function(){
		return Session.get('final_price');
	}
});

