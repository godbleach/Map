UsersInfo = new Mongo.Collection('usersInfo');


UsersInfo.allow({
	insert: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }

});
