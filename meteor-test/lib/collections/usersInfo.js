UsersInfo = new Mongo.Collection('usersInfo');


UsersInfo.allow({
	remove: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }

});
<<<<<<< HEAD

Meteor.methods({
	addUserInfo: function(info)
	{
		var infoId = UsersInfo.insert(info);

		return {
		 	_id: infoId
		};
	},
});
=======
>>>>>>> 47af928d9edf3bd5a9906a0baac9d0bcc48daf2d
