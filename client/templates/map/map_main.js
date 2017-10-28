Template.mapMain.helpers({

  haveMark: function(){
    console.log(Markers.find().count() === 0);
    return Markers.find().count() === 0;
  },

  posts: function() {
    // var allMark = Markers.distinct("userId");
    var allMark = _.uniq(Markers.find({}, {
      sort: {userId: 1}, fields: {userId: true}
    }).fetch().map(function(x) {
        return x.userId;
    }), true);
    // console.log(allMark);
    return Posts.find({userId: {$in:allMark} });
  },

});
