Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('uploads', function() {
  return Uploads.find();
});


Meteor.publish('productData', function(terms,limit) {
  if(typeof terms.showName !='undefined'||terms.showName != null){
	var parameters = queryConstructor(terms,limit);

	// console.log("param = ");
	// console.log(parameters);
	// var data =  Products.find(parameters.find,parameters.sort).fetch();
	// console.log("data = ");
	// console.log(data);
	// console.log("data = ");
	// console.log(Products.find().fetch());
	return Products.find(parameters.find,parameters.sort);
}
else {
  return null;
}

});

Meteor.publish('account_details',function(user){
  // console.log("acount details-------------------");
  // console.log(Ordered.find().fetch());
  //console.log(Ordered.find({orderedBy:user}).fetch());
  return Ordered.find({orderedBy:user});
});

Meteor.publish(null,function(){
	return Meteor.roles.find({});
});

Meteor.publish('allProducts',function(){
	return Products.find();
});

Meteor.publish('toBeEditedProduct',function(id){
	//console.log(Products.find({_id:id}).fetch());
	return Products.find({_id:id});
});


//publications for webhooks //
Meteor.publish('categoryProducts', function(catName){
	return Products.find({categories:catName});
});

// webhooks publication end here //

Meteor.publish('catData',function(){
	//fetch());
    return Categories.find();
});


Meteor.publish('couponsData',function(){
	return Coupons.find();
});



Meteor.publish('searchData',function(){
	return Search.find();
});

Meteor.publish('allOrders',function(){
	return Ordered.find();
});

Meteor.publish('orders',function(limit){
	return Ordered.find({},{sort:{createdAt:-1},limit:limit});
});

Meteor.publish('orderedData',function(paymentRequestId,oId){
	// console.log("In publication");
	// console.log(paymentRequestId);
	if(paymentRequestId == null || typeof paymentRequestId == 'undefined'){
    //console.log("In publication---------------")
		//console.log(Ordered.find({_id:oId}).fetch());
		return Ordered.find({_id:oId});
	}
	//console.log(Ordered.find({paymentRequestId:paymentRequestId}).fetch());
	return Ordered.find({paymentRequestId:paymentRequestId}); // orderedBy : owner
});

Meteor.publish('single_order_admin',function(id){
	//console.log(Ordered.find({_id:id}).fetch());
	return Ordered.find({_id:id});
});

Meteor.publish('search_orders',function(val,param){
        // console.log(val);
        // console.log(param);
        if(param == '0'){

          //console.log(result);
          //console.log(sync({_id:val}).fetch());
          var result = Ordered.find({_id:val});
          return result;
        }
        else if(param == '1'){

          //console.log(Ordered.find({status:val}).fetch());
          return Ordered.find({status:val});
        }
        else if(param == '2'){
          var val = parseFloat(val);
          return Ordered.find({total_amount:val});
        }
        else if(param == '3'){
          return Ordered.find({paymentMethod:val});
        }
        else if(param == '4'){
          return Ordered.find({paymentId:val});
        }
        else if(param == '5'){
          //console.log(Ordered.find({"checkoutDetails.name":val}).fetch());
          return Ordered.find({"checkoutDetails.name":val});
        }
        else if(param == '6'){

          return Ordered.find({"checkoutDetails.contact":val});

        }
        else if(param == '7'){
          return Ordered.find({"checkoutDetails.email":val});
        }

});
