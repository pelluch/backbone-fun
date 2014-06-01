
$(function() {
	console.log('Success');
});

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

var c;
function update() {

	complaints.fetch({
		success: function(model, response) {
			c = complaints.get(19);
		}
	});
}


update();
