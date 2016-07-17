
Template.success.onRendered(function(){
	var rId = Session.get('payment_request_id');
	var oId = Session.get('res');
	// if(typeof rId == 'undefined')
	// 	rId = Session.get('res');
	//console.log(rId);
	
	//console.log(Ordered.find().fetch());
	//console.log(Session.get('res'));
	Meteor.call('changeStatus',rId,oId,function(error,result){
		if(error);
			//console.log(error.reason);
		else;
			//console.log(result);
	});
	var pay = Session.get('payment_id');
	if (typeof pay == 'undefined'){
		pay = "randomNumber";
	}
	//console.log(pay);
	Meteor.call('setPaymentStatus',rId,oId,pay,function(error,result){
		if(error);
			//console.log(error.reason);
		else;
			//console.log(result);
	});
	Meteor.call('update_stock',rId,oId,function(){
		if(error);
			//console.log(error.reason);
		else;
			//console.log(result);
	});
	//console.log(Ordered.find().fetch());

	// clearing local Storage //
	//Meteor.subscribe('orderedData',rId,oId);
	shoppingCart.remove({});
	

	/////////////////    These are call for email, and sms //////////////////////////////////
	//Meteor.call('sendEmailText', $('#email').val(),"subject","text");
    //Meteor.call('sendEmailHTML', $('#email').val(),"subject","text");
    //Meteor.call('sendSMS',$('#num').val(),"Hello PARAG! This is a test message");
	///////////////////////////////////////////////////////////////////////////////////////////

});
Template.success.events({
	'click button': function(event){
		event.preventDefault();
		Router.go('products');
	}
});

// Template.success.helpers({
// 	'ordered_products':function(){
// 		console.log(Ordered.find().fetch());
// 		return Ordered.find().fetch()[0].products;
// 	},

// });

