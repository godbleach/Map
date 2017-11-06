Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('markers', function() {
  return Markers.find();
});


Meteor.publish('Files', function() {
  return Files.find();
});

Meteor.publish('Nearbys', function() {
  return Nearbys.find();
});

Meteor.publish('historys', function() {
  return Historys.find();
});
