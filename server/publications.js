Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('markers', function() {
  return Markers.find();
});


Meteor.publish('Files', function() {
  return Files.find();
});

Meteor.publish('nearbys', function() {
  return Nearbys.find();
});

Meteor.publish('historys', function() {
  return Historys.find();
});
