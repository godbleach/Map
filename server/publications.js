Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('markers', function() {
  return Markers.find();
});

Meteor.publish('usersInfo', function() {
  return UsersInfo.find();
});

Meteor.publish('Images', function() {
  return Images.find();
});

Meteor.publish('Sounds', function() {
  return Sounds.find();
});
