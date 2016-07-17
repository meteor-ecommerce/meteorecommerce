Template.editData.events({
	'click .product':function(){
		$('.prodData').show();
		$('.catData').hide();
		
	},
	'click .category':function(){
		$('.prodData').hide();
		$('.catData').show();
		
	},
	
});

Template.commonProd.helpers({
	'clickedProd':function(){
		return Products.find();
	}
});


Template.commonCat.helpers({
	'clickedCat':function(){
		return Categories.find();
	}
});


Template.commonProd.events({
	'click .delProd':function(event){
		event.preventDefault();
		//console.log(this._id);
		var id = this._id;
		var p = prompt("Are you sure you want to delete this?", "Enter Y or N");
		if (p.toLowerCase() == "y"){
			var x = prompt("Are you double sure?", "Enter Y or N");
			if(x.toLowerCase() == "y"){
				//console.log("cool");
				Meteor.call('remove_product',id,function(error,result){
					if(!error){
						//console.log("removed");
					}
				});
			} 
		}
	}
});

Template.commonCat.events({
	'keyup #catEdit':function(event){
		var id = this._id;
		var val = $(event.target).val();
		
		if(event.which == 13){
			// console.log(id);
			// console.log(val);
			Meteor.call('update_categories',id,val,function(error,result){
				if(!error);
					//console.log("done");
			});
			$(event.target).blur();
		}
	},

	'click .delCat':function(event){
		event.preventDefault();
		//console.log(this._id);
		var id = this._id;
		var p = prompt("Are you sure you want to delete this?", "Enter Y or N");
		if (p.toLowerCase() == "y"){
			var x = prompt("Are you double sure?", "Enter Y or N");
			if(x.toLowerCase() == "y"){
				//console.log("cool");
				Meteor.call('remove_category',id,function(error,result){
					if(!error){
						//console.log("removed");
					}
				});
			} 
		}
	}
	
});

