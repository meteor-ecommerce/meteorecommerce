

Meteor.subscribe('catData');



Template.cat_dropdown.helpers({
	'categ':function(){

		return Categories.find();
	}
});

Template.add_categories.events({
	'submit .add_cat':function(event){
		event.preventDefault();
		var cat = $('[name=cat_name]').val();

		
		// Categories.insert({
		// 	name:cat
		// });
		Meteor.call('insert_category',cat,function(error,result){
			if(error);
				//console.log(error);
			else;
				//console.log(result);
		});
		$('[name=cat_name]').val('');

		
	},

	
});


