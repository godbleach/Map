UsersInfo = new Mongo.Collection('usersInfo');


UsersInfo.allow({
	remove: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }

});
<<<<<<< HEAD

Meteor.methods({
	// addUserInfo: function(info)
	// {
	// 	var infoId = UsersInfo.insert(info);
	//
	// 	return {
	// 	 	_id: infoId
	// 	};
	// },
});
=======
>>>>>>> parent of 3757a89... เขียน log ยังไม่ได้นะ
