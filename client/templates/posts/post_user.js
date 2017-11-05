Template.postuser.helpers({

    // std_id: function(){
    //     var id = 
    // }
    // posts: function() {
    //     return Posts.find({}, {sort: {submitted: -1}});
    //   }
});

Template.postuser.events({
    "click .button#check":function(e){
        Router.go("/historys/"+this._id);
      },
});