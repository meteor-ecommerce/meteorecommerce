//Meteor.subscribe('catData');

Meteor.subscribe('couponsData');
var val;

Template.addCoupons.events({
	'change .drop':function(event){
		val = $('.drop').val();
	},

	'submit .couponsForm':function(event){
		event.preventDefault();
		var code = $('#code').val();
		var validity = $('#validity').val();
		var discount = $('#discount').val();
		var excluded_categories = val;
		var use_count = $('#usage_count').val();
		var use_per_user = $('#usage_per_user').val();
		var check = $('#checkBox:checked').length;

		if(check == 0){
			check = false;
		}else{
			check = true;
		}

		// console.log(code);
		// console.log(validity);
		// console.log(discount);
		// console.log(excluded_categories);
		// console.log(use_count);
		// console.log(check);

		Coupons.insert({
			code : code,
			valid_till:validity,
			discount:discount,
			excluded_categories:excluded_categories,
			usage_count:use_count,
			usage_per_user : use_per_user,
			usage_coupon: check
		});


	}
});

Template.categories_dropdown.helpers({
	'categs':function(){
		return Categories.find();
	}
});

Template.coupons.helpers({
	'coupon':function(){
		return Coupons.find();
	}
})


