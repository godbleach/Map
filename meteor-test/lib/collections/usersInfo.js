UsersInfo = new Mongo.Collection('usersInfo');


UsersInfo.allow({
	remove: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }

});

Meteor.methods({
	addUserInfo: function(info)
	{
		var infoId = UsersInfo.insert(info);

		return {
		 	_id: infoId
		};
	},
});
