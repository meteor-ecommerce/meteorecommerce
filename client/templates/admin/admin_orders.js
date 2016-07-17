var handle;
Template.adminOrders.onCreated(function(){
	Tracker.autorun(function(){
			 handle = Meteor.subscribeWithPagination('orders',2);		
	});
});


Template.adminOrders.helpers({
	'orders':function(){
		return Ordered.find();
	},
	

});




Template.adminOrders.events({
	'click .more':function(event){
		event.preventDefault();
      	handle.loadNextPage();
	},
	'change .c_status':function(event){
		
		var value = $(event.currentTarget).val();
		//console.log(this._id);
		Session.set('dropValue',value);
		//console.log(value);
	},

	
	'click .changeStatus':function(event){
		event.preventDefault();
		console.log(this._id);
		var id = this._id;
		var val = Session.get('dropValue');
		//var val = $('.c_status').val();
		//console.log(val);
		//console.log(Session.get('dropValue'));
		Meteor.call('update_status_admin',id,val,function(error,result){
			if(!error);
				//console.log("done");
		});	
	},

	'click .details':function(event){
		handle.stop();
		Router.go('single_order',{_id:this._id});
	}

});



