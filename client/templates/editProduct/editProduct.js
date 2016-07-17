

Template.editProductForm.events({
	'submit .editForm':function(event){
		event.preventDefault();
		var p_name = $('[name=pName]').val();
		var p_price = $('[name=pPrice]').val();
		var p_slug = $('[name=slug]').val();
		var p_salePrice = $('[name=salePrice]').val();
		var p_costPrice = $('[name=costPrice]').val();
		// var p_discount = $('[name=discount]').val();
		var p_categories = $(".catCheck input[type='checkbox']:checked").val();
		//var p_tags = $('[name=tags]').val();
		
		var p_longDescription = $('[name=longDescription]').val();
		var p_shortDescription = $('[name=shortDescription]').val();
		var p_stock = $('[name=stock]').val();
		var discount = ((p_price-p_salePrice)/p_price)* 100;
		var id = Products.find().fetch()[0]._id;
		// console.log(p_name);
		// console.log(p_categories);
		// console.log(p_color);
		// console.log(p_fabric);
		// console.log(p_type);
		Meteor.call('updateProduct',id,p_name,p_price,p_slug,p_salePrice,p_costPrice,p_categories,p_longDescription,p_shortDescription,p_stock,discount,function(error,result){
			if(error){
				//console.log(error.reason);
			}else{
				
				//console.log("product Updated");
			}
		});
	}
});


Template.editProductForm.helpers({
	'name1':function(){
		//console.log(Products.find().fetch());
		return Products.find().fetch()[0].name;
	},
	'slug':function(){
		return Products.find().fetch()[0].slug;
	},
	'price':function(){
		return Products.find().fetch()[0].price;
	},
	'salePrice':function(){
		return Products.find().fetch()[0].salePrice;
	},
	'costPrice':function(){
		return Products.find().fetch()[0].costPrice;
	},
	'shortDescription':function(){
		return Products.find().fetch()[0].shortDescription;
	},
	'longDescription':function(){
		return Products.find().fetch()[0].longDescription;
	},
	'stock':function(){
		return Products.find().fetch()[0].stock;
	},
	
	'cats':function(){
		return Categories.find();
	},
	
	

	'exists':function(name){
		return name == Products.find().fetch()[0].categories;
	},
	
});

