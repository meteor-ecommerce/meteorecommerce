Template.single_order.helpers({
	'Products':function(){
		// console.log(Ordered.find().fetch());
		// console.log(Ordered.find().fetch()[0].products);
		return Ordered.find().fetch()[0].products;
	},
	'status':function(){
		return Ordered.find().fetch()[0].status;
	}
});

Template.single_order.events({
	'change .class_status':function(event){
		
		var value = $(event.currentTarget).val();
		//console.log(this._id);
		Session.set('dropValue',value);
		//console.log(value);
	},

	
	'click .chngStatus':function(event){
		event.preventDefault();
		//console.log(this._id);
		var id = Ordered.find().fetch()[0]._id;
		var val = Session.get('dropValue');
		//var val = $('.c_status').val();
		// console.log(val);
		// console.log(id);
		//console.log(Session.get('dropValue'));
		Meteor.call('update_status_admin',id,val,function(error,result){
			if(!error)
				console.log("done");
		});	
	},
});