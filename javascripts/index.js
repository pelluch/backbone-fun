
Backbone.sync = function(method, model, options) {

	var methodMap = {
		'create' : 'POST',
		'read' : 'GET',
		'update' : 'PUT',
		'delete' : 'DELETE'
	};

	// console.log(method);
	// console.log(model);
	// console.log(options);

	switch(method) {
		case 'create': 
		break;

		case 'read':
			if(model.idAttribute) {
				var id = model[model.idAttribute];
				var url = model.urlRoot + '/' + id;
				$.getJSON(url)
				.done(function(data, statusText, xhr) {
					options.success(data);
					model.trigger("sync");
				})
				.fail(function(xhr, statusText, responseJSON) {
					// console.log(xhr);
					// console.log(statusText);
					// console.log(responseJSON);
					options.error(responseJSON);
					model.trigger("error");
				});
			}
		break;

		case 'update':
		break;

		case 'delete':
		break;
	}

};



var Complaint = Backbone.Model.extend({
	
	idAttribute: 'id',
	urlRoot: 'http://localhost:3001/v1/complaints'
});

var Complaints = Backbone.Collection.extend({
	model: Complaint,
	url: 'http://localhost:3001/v1/complaints',
	comparator: function(c) {
		return c.get('rating');
	}
});

var complaints = new Complaints;

complaints.on('add', function() {
	console.log('Added');
});

complaints.on('remove', function() {
	console.log('Removed');
});

complaints.on('change', function(c) {
	console.log('Updated');
});

var c = new Complaint({
	id: 456
});

var model, response, options;

c.fetch({
	success: function(model, response, options) {
		console.log(model);
		console.log(response);
		console.log(options);
	},
	error: function(model, xhr, options) {
		console.log(model);
		console.log(xhr);
		console.log(options);
	}
});
// function update() {

// 	complaints.fetch({
// 		success: function(model, response) {
// 			c = complaints.get(19);
// 		},
// 		add: true,
// 		change: true,
// 		remove: true
// 	});
// }


// update();
