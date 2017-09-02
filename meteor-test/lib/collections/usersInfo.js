usersInfo = new Mongo.Collection('usersInfo');


usersInfo.allow({
	insert: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }

});