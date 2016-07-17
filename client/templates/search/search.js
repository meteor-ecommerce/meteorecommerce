Template.productSearch.rendered=function(){
	Meteor.subscribe("searchData");
	AutoCompletion.init("input#prodsearchbar");

};

Template.productSearch.events({
	'keyup input#prodsearchbar':function(){
	AutoCompletion.autocomplete({
	element: 'input#prodsearchbar', // DOM identifier for the element
	collection: Search, // MeteorJS collection object
	field: 'pName', // Document field name to search for
	limit: 5, // Max number of elements to show
	sort: { pName: 1 }}); // Sort object to filter results with
	//filter: { 'gender': 'female' }}); // Additional filtering
	}

});