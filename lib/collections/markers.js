Markers = new Mongo.Collection('markers');

Markers.allow({
	update: function(userId, doc) { return true; },
	remove: function(userId, doc) { return true; },
});

Meteor.methods({
	markInsert: function(markAttibutes){
		
		if(Markers.findOne({userId : markAttibutes.userId})){
			return
		}
			// Bert.alert({
			// 	title: 'Accident',
			// 	message: 'helppppp',
			// 	type: 'info',
			// 	style: 'fixed-top',
			// 	icon: 'fa-ambulance'
			// });
			// var s = new buzz.sound('/sounds/alert1.wav');
			// s.play();

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
