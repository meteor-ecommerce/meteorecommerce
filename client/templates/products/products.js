// this file contains the helpers and events associated with the 'data_queries.html' file //

// most functions are defined in 'methods.js'. You can refer there to get the idea of their functioning //
var limit = 2;
var terms = {
      showName : Session.get('show'),
      low: 0,
      high: 3000,
      //category : ["casuals","formals", "partywear","summerwhites"]
      //limit : 2

   };
// console.log("outside");
// console.log(terms);
var handle;
//Template.products.onCreated(function(){
//   var self = this;
   Tracker.autorun(function(){
      //console.log(Session.get('show'));
      terms.showName = Session.get('show');
      terms.low = Session.get('sliderMinValue');
      terms.high = Session.get('sliderMaxValue');
      terms.category = Session.get('checkboxValue');
      //terms.discount = Session.get('checkDiscountValue');
      //console.log(terms.discount);
      handle = Meteor.subscribeWithPagination('productData',terms,limit);
   });
//});


Template.products.events({
	'change .c_sortdropdown':function(event){
      event.preventDefault();

      var v = $('.c_sortdropdown').val();

      //Session.set('opt',v);
      console.log(v);
      Session.set('show',v);
      handle.stop();

	},
   'click .load':function(event){
      event.preventDefault();
      handle.loadNextPage();
   },
   'click .addCart':function(event){

   var productId = this._id;
    var owner;
    if (!Meteor.userId()){
        owner = "guest";
    }else{
        owner = Meteor.userId();
    }
    //var designId = Session.get('DesignId');
    var prod = Products.find({_id:productId}).fetch();
    var prod_name = prod[0].name;
    var prod_price = prod[0].salePrice;
    var prod_desc = prod[0].shortDescription;
    var quantity = 1;
      shoppingCart.insert({
        prodId:productId,
        orderedBy:owner,
        item:prod_name,
        price: prod_price,
        quantity: quantity,
        description: prod_desc
     });
   }
});


Template.products.helpers({
   'show_products':function(){
      //var parameter = Session.get('param');
      //return Products.find(dataQuery(parameter).find, dataQuery(parameter).sort);

      // console.log(terms);
      // console.log('terms.showname = ');
      // console.log(terms.showName);
      terms.showName = Session.get('show');
      terms.low = Session.get('sliderMinValue');
      terms.high = Session.get('sliderMaxValue');
      terms.category = Session.get('checkboxValue');
      //terms.discount = Session.get('checkDiscountValue');
      //console.log(terms.discount);
      if(typeof terms.showName !='undefined'||terms.showName != null){
      var parameters = queryConstructor(terms);
      //parameters.find, parameters.sort
      //console.log(Products.find(parameters.find, parameters.sort).fetch());
      return Products.find(parameters.find, parameters.sort);
    }
    else{
      return null;
    }
   }
});


Template.products.onRendered(function(){
         //console.log($('.c_sortdropdown').val());
         var opt = $('.c_sortdropdown').val();
         Session.set('show',opt);
         //console.log(Session.get('show'));


});



Template.products.events({
	'click .p':function(event){
		event.preventDefault();
		//console.log(this._id);

		Session.set('prodId',this._id);
      //console.log(Session.get('prodId'));

	}
});
