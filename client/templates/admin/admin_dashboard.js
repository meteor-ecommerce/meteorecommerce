Template.adminDashboard.events({
	'click .7':function(){
		$('.seven').show();
		$('.thirty').hide();
		$('.mon').hide();
		$('.all').hide();

	},
	'click .30':function(){
		$('.seven').hide();
		$('.thirty').show();
		$('.mon').hide();
		$('.all').hide();

	},
	'click .month':function(){
		$('.seven').hide();
		$('.thirty').hide();
		$('.mon').show();
		$('.all').hide();

	},
	'click .overall':function(){
		$('.seven').hide();
		$('.thirty').hide();
		$('.mon').hide();
		$('.all').show();

	}
});

Template.lastSevenDaysOrders.helpers({
	'total_amount': function(){
		// Meteor.call('revenue',7,function(error,result){
		// 	if(!error)
		// 		console.log("good");
		// });
		//return ReactiveMethod.call('revenue',7);
	},
	// 'total_order':function(){
	// 	return Ordered.find().count();
	// },
	// 'total_products':function(){
	// 	var sum = 0;
	// 	var x = Ordered.find();
	// 	x.forEach(function(ordered){
 //       		sum = sum + ordered.products.length;
 //     	});
 //     	return sum; 
	// }
});