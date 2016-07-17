Template.addNewProduct.events({
	'submit .newProductForm': function(event){
		event.preventDefault();
		var p_name = $('[name=pName]').val();
		var p_price = $('[name=pPrice]').val();
		var p_slug = $('[name=slug]').val();
		var p_salePrice = $('[name=salePrice]').val();
		var p_costPrice = $('[name=costPrice]').val();
		// var p_discount = $('[name=discount]').val();
		var p_categories = $('.c_sortdropdown').val();
		//var p_tags = $('[name=tags]').val();
		var p_longDescription = $('[name=longDescription]').val();
		var p_shortDescription = $('[name=shortDescription]').val();
		var p_stock = $('[name=stock]').val();
		
		//var currentImage = Session.get('urlOfImg');
		// console.log(p_price);
		// console.log(p_salePrice);
		var discount = ((p_price-p_salePrice)/p_price)* 100;
		// console.log(p_categories);
		// console.log(discount);

		Meteor.call('insert_product_data',p_name,p_price,p_slug,p_salePrice,p_costPrice,p_categories,p_longDescription,p_shortDescription,p_stock,discount,function(error,result){
			if(error){
				//console.log(error.reason);
			}else{
				//console.log(result);
				Session.set('idProduct',result);
				//console.log("product Added");
			}
		});
		var Id = Session.get('idProduct');
		//console.log(Id);
		Meteor.call('search_data',Id,p_name,function(error,result){
			if(error){
				//console.log(error.reason);
			}
			else{
				//console.log(result);
			}
		});
		$('[name=pName]').val('');
		$('[name=pPrice]').val('');
		$('[name=slug]').val('');
		$('[name=salePrice]').val('');
		$('[name=costPrice]').val('');
		$('[name=shortDescription]').val('');
		$('[name=longDescription]').val('');
		$('[name=stock]').val('');
		
		


	}

});