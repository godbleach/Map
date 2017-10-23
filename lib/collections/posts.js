Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function(userId, post) { return ownsDocument(userId, post); },
	remove: function(userId, post) { return 1 },
});

Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
		var errors = validatePost(modifier.$set);
		return errors.userName || errors.firstName || errors.lastName || errors.bloodType || errors.faculty || errors.major || errors.emerCell;
	}
});

// Posts.deny({
// 	update: function(userId, post, fieldNames) {
// 	 // may only edit the following two fields:
// 	 return (_.without(fieldNames, 'url', 'title').length > 0);
// 	}
// });

validatePost = function (post) {
	var errors = {};
	// if (!post.title)
	// 	errors.title = "Please fill in a headline";
	// if (!post.url)
	// 	errors.url =  "Please fill in a URL";
	if(!post.userName)
		errors.userName = "Please fill UserName ";
	if(!post.firstName)
		errors.firstName = "Please fill First Name ";
	if(!post.lastName)
		errors.lastName = "Please fill Last Name ";
	if(!post.bloodType)
		errors.bloodType = "Please fill Blood Type ";
	if(!post.faculty)
		errors.faculty = "Please fill Faculty ";
	if(!post.major)
		errors.major = "Please fill Major ";
	if(!post.emerCell)
		errors.emerCell = "Please fill Emergency Cell ";
	return errors;
}


Meteor.methods({

	postInsert: function(postAttributes) {
		check(this.userId, String);

		check(postAttributes, {
			// title: String,
			// url: String,
			userName : String,
      firstName : String,
      lastName : String,
      bloodType : String,
      faculty : String,
      major : String,
      emerCell : String
		});

		var errors = validatePost(postAttributes);
		if (errors.userName || errors.firstName || errors.lastName || errors.bloodType || errors.faculty || errors.major || errors.emerCell)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		// if (Meteor.isServer) {
		// 	postAttributes.title += "(server)";
		// 	// wait for 5 seconds
		// 	Meteor._sleepForMs(5000);
		// } else {
		// 	postAttributes.title += "(client)";
		// }

		var postWithUserName = Posts.findOne({userName: postAttributes.userName});
		if (postWithUserName) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		// var post = _.extend(postAttributes, {
		// 	// userId: user._id,
		// 	// author: user.username,
		// 	submitted: new Date()
		// });

		// var postId = Posts.insert(post);
		var postId = Posts.insert(postAttributes);

		return {
		 	_id: postId
		};
	},

});

// Posts.allow({
// 	remove: function(userId, doc) {
// 	// only allow posting if you are logged in
// 	return !! userId;
// 	}
// });
