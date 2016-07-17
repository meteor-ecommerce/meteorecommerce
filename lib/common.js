//this file is for sorting data based on user's choice
//this code will be common to both server and client

//create an object called show
var show = {};

//create a property called 'high to low(htl)' when user wants to sort by high to low price
show.htl = function(terms,limit){
	return {

		find:{ price : { $gte : terms.low, $lt: terms.high }, categories:{$in : terms.category}},
		sort:{sort:{price:-1},limit:limit}

	};

}

show.lth = function(terms,limit){
	return {
		find:{ price : { $gte : terms.low, $lt: terms.high }, categories:{$in : terms.category}},
		sort:{sort:{price:1},limit:limit}
	};

}

show.new = function(terms,limit){
	return {
		find:{ price : { $gte : terms.low, $lt: terms.high }, categories:{$in : terms.category}},
		sort:{sort:{createdAt:-1},limit:limit}
	};

}

show.rating = function(terms,limit){

	return {
		find:{ price : { $gte : terms.low, $lt: terms.high }, categories:{$in : terms.category}},
		sort: {sort:{rating:-1},limit:limit}
	}

}

show.dhtl = function(terms,limit){

	return {
		find:{ price : { $gte : terms.low, $lt: terms.high },categories:{$in : terms.category}},
		sort: {sort:{discount:-1},limit:limit}
	}

}

show.dlth = function(terms,limit){

	return {
		find:{ price : { $gte : terms.low, $lt: terms.high }, categories:{$in : terms.category}},
		sort: {sort:{discount:1},limit:limit}
	}

}

queryConstructor = function(terms,limit){
	//console.log(show['htl']);
	if(typeof terms.showName != 'undefined'){
		var showFunction = show[terms.showName];
	//console.log(showFunction);
		var parameters = showFunction(terms,limit);
		//console.log(parameters)
		return parameters;
}
}
