if (Meteor.isServer)
{
	Meteor.methods({
		addUserInfo: function(userName,bloodType,faculty,major,emerCell,latitude,longitude)
		{
			UsersInfo.insert({
				userName : userName,
				bloodType : bloodType,
				faculty : faculty,
				major : major,
				emergencyCell : emerCell,
				latitude : latitude,
				longitude : longitude
			});
		},
	});
}
