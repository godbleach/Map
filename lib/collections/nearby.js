Nearbys = new Mongo.Collection('nearbys');


Nearbys.allow({
	update: function(userId, doc) { return true; },
	remove: function(userId, doc) { return true; },
});

Meteor.methods({
	insertNearby: function(latlng){
    if(Nearbys.find({userId : latlng.userId})){
			var near = Nearbys.find({userId : latlng.userId});
			near.forEach(function (n) {
				Nearbys.remove(n._id);
		});

		}

		if(Nearbys.findOne({ "$and": [{ userId :latlng.userId },{ lat :latlng.lat } ] })){
			return
		}

     	var nearbyId = Nearbys.insert({
				userId:latlng.userId,
				lat:latlng.lat,
				lng:latlng.lng,
				mark:true,
				});
     	return {
		 	_id: nearbyId
		};
	},

	insertNearbyMark: function(info){
		if(Nearbys.findOne({userId : info.userId})){
			var oldNearby = Nearbys.findOne({userId : info.userId});
			if(oldNearby.mark){
					Nearbys.remove(oldNearby._id);
			}
		}
			var nearbyId = Nearbys.insert({
				mark: false,
				userId : info.userId,
				lat : info.lat,
				lng : info.lng,
				name : info.name,
				icon : info.icon,
				vicinity : info.vicinity,
				formatted_address : info.formatted_address,
				formatted_phone_number : info.formatted_phone_number,
				rating : info.rating,
				website : info.website,
			});
			return {
			_id: nearbyId
		};
	},

});

if (Meteor.isServer) {
  Meteor.publish('nearbys.all', () => Nearbys.find().cursor);
} else {
  Meteor.subscribe('nearbys.all');
}
