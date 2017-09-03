if (Meteor.isServer)
{
	Meteor.methods({
		addUserInfo: function(userName,bloodType,faculty,major,emerCell)
		{
			usersInfo.insert({
				userName : userName,
				bloodType : bloodType,
				faculty : faculty,
				major : major,
				emergencyCell : emerCell
			});
		},
	});
}