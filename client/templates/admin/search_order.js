Tracker.autorun(function(){
	var val = Session.get('v');
	var param = Session.get('p');
	// console.log(val);
	// console.log(param);
	Meteor.subscribe('search_orders',val,param);
});



Template.search_order.helpers({
	'searchedOrders':function(){
		
		return Ordered.find();
	}
});


Template.search_order.events({
	'change .c_search':function(event){
		var value = $(event.currentTarget).val();
		//console.log(value);
		Session.set('searchParam',value);
	},

	'change input[name=search]':function(event){
		var val = $(event.currentTarget).val();
		//console.log(val);
		Session.set('searchVal',val);
	},
	'click .goOrders':function(event){
		var val = Session.get('searchVal');
		var param = Session.get('searchParam');
		// console.log(val);
		// console.log(param);
		Session.set('v',val);
		Session.set('p',param);
		//console.log(Session.get('searchResults'));

		$('.searchResult').show();

	},
});