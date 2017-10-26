Markers = new Mongo.Collection('markers');

Markers.allow({
	update: function(userId, doc) { return true; },
	remove: function(userId, doc) { return true; },
});

Meteor.methods({
	markInsert: function(markAttibutes){
     	var markerId = Markers.insert({
				userId:markAttibutes.userId,
				lat:markAttibutes.lat,
				lng:markAttibutes.lng });
     	return {
		 	_id: markerId
		};
	},

});

if (Meteor.isServer) {
  Meteor.publish('markers.all', () => Markers.find().cursor);
} else {
  Meteor.subscribe('markers.all');
}
