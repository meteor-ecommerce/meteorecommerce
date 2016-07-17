///// router for all the templates //



Router.configure({
     layoutTemplate: 'layout'
});


Router.route('/account',{
	name: 'account',
	template: 'account',
	waitOn: function(){
		return Meteor.subscribe('account_details',Meteor.userId());
	}
});


Router.route('/add_new_product',{
	name:'addNewProduct',
	template:'addNewProduct'
});

Router.route('/',{
	name: 'products',
	template: 'products',
	// waitOn: function(){
	// 	return Meteor.subscribe('lists');
	// }
});




Router.route('/categories',{
	name: 'categories',
	template: 'categories',
});





// all webhooks //

Router.route('/category/:_name', {
	//name: 'category',
	loadingTemplate: 'loading',
	waitOn: function(){
		return Meteor.subscribe('categoryProducts', this.params._name);
	},
	action: function () {
    	this.render('category');
  	}
});

/// web hooks end here //

//other routers//

Router.route('/productSearch',{
	name:'productSearch',
	template:'productSearch'
});


Router.route('/coupons',{
	name: 'coupons',
	template: 'coupons',
});


Router.route('/cart',{
	name: 'cart',
	template: 'cart',
});

Router.route('/checkout',{
	name : 'checkout',
	template : 'checkout'
});

Router.route('/success',{
	name : 'success',
	template : 'success'
});

// This is for redirectUrl post Payment from client //
var x;
var paymentId;
var paymentRequestId;
Router.route('/redirect',{
	loadingTemplate:'loading',
	waitOn:function(){
		paymentId = this.params.query.payment_id;
		paymentRequestId = this.params.query.payment_request_id;
		// console.log(this.params._id);
		// console.log(paymentId);
		// console.log(paymentRequestId);
		Session.set('payment_id',paymentId);
		Session.set('payment_request_id',paymentRequestId);
		//console.log(Session.get('payment_request_id'));
		 x = ReactiveMethod.call('getPaymentDetails',paymentId,paymentRequestId);
		 Session.set('x_value',x);
		//console.log(x);

	},
	action:function(){
		if(x == true){

			this.render('success');
		}
		else if(x == false){
			this.render('failure');
		}
	}
});

Router.onBeforeAction(function () {
    if  (!Roles.userIsInRole( Meteor.userId(), 'admin')) {
        this.redirect('/');
        this.stop();
    } else {
        this.next();
    }
},{only: ['admin_orders' , 'single_order', 'search_order','adminDashboard','admin_control','addNewProduct','categories'] });

Router.onBeforeAction(function () {
    if  (!Meteor.user()) {
        this.redirect('/');
        this.stop();
    } else {
        this.next();
    }
},{only: ['account'] });



Router.route('/admin_control',{
	name:'admin_control',
	template:'editData',
	waitOn:function(){
		return [Meteor.subscribe('allProducts'),
		Meteor.subscribe('catData'),
		];
	}
});

Router.route('/editProductForm/:_id',{
	name: 'edit_product_form',
	template: 'editProductForm',
	waitOn:function(){
		//templateData= {products: Meteor.subscribe('toBeEditedProduct',this.params._id)};
		return [Meteor.subscribe('toBeEditedProduct',this.params._id),
					Meteor.subscribe('catData'),
				];
		//return templateData;
	},


});

Router.route('/admin_dashboard',{
	name:'adminDashboard',
	template:'adminDashboard',
	waitOn:function(){
		return Meteor.subscribe('allOrders');
	}

});

Router.route('/admin_orders',{
	name:'admin_orders',
	template:'adminOrders',



});

Router.route('/single_order/:_id',{
	name: 'single_order',
	template: 'single_order',
	waitOn:function(){
		//templateData= {products: Meteor.subscribe('toBeEditedProduct',this.params._id)};
		return Meteor.subscribe('single_order_admin',this.params._id);
		//return templateData;
	},


});

Router.route('/search_order',{
	name:'search_order',
	template:'search_order'
});
