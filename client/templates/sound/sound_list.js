// Template.soundsList.onCreated(function() {
//   alert('hi');
// });


Template.soundsList.events({

  // Meteor.subscribe('sounds');

  'click .play': function() {
    console.log("hello");
    var s = new buzz.sound('/sounds/song1.mp3');
    s.play();
  },

});
