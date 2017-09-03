Template.postUser.helpers({

  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  },

  ownPost: function() {
  	return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
