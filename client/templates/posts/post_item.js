import { Sounds, Images } from '/lib/collections/files.js';
import './post_item.html';

$('.checkbox')
  .last()
  .checkbox({
    uncheckable: false
  });

Template.postItem.rendered = function(){
    this.$('.ui.accordion').accordion();
    this.$('.ui.dropdown').dropdown();
    this.$('.ui.checkbox').checkbox({uncheckable: false});
}

Template.postItem.helpers({
  // check: function(){
  //   if(Session.get('check'+ this._id)){
  //     console.log('uncheck');
  //     this.$('.ui.checkbox')
  //       .last()
  //       .checkbox({
  //         uncheckable: false
  //       });
  //     Session.set('check'+ this._id,false);
  //   }
  //   return ;
  // },

  nearby: function(){
    console.log(this._id);
    return this._id;
  },

  trackAccordion: function(){
    this.$('.ui.accordion').accordion();
  },

  imageFile: function() {
    // console.log(this.userId);
    return Images.find({"userId":this.userId});
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

Template.postItem.events({
  'click .button#remove': function(e){
    e.preventDefault();
     var markId = Markers.findOne({userId: this.userId});
     var user = Posts.findOne({userId: this.userId});
     var user_id = user.username;
     Session.set('lat',markId.lat);
     Session.set('lng',markId.lng);
    // console.log(markId);
    Markers.remove(markId._id);

  },

  'click .button#info': function(e){
    Transitions.transitionOut = 'fadeOut'
    Transitions.transitionIn = 'fadeIn'
    Router.go("/posts/"+this._id);
  },

  'click .header#setCenter': function(e){
    let markId = Markers.findOne({userId: this.userId});
    Session.set('nearby',this._id);
    Session.set('lat',markId.lat);
    Session.set('lng',markId.lng);
  },

  // 'click #dropNearby': function(e){
  //   console.log('find Hospital');
  //   if(Session.get('nearOn'+this._id)){
  //     return;
  //   }
  //   let markId = Markers.findOne({userId: this.userId});
  //   Session.set('nearby',this._id);
  //   Session.set('nearLatLng', {lat:markId.lat, lng:markId.lng});
  //   // console.log(  Session.get('check'+ this._id) );
  //   Session.set('nearOn'+this._id,true);
  // },

  'click #check': function(e){
    Session.set('check'+ this._id, true);
    console.log( 'check'+ this._id);
    // console.log(  Session.get('check'+ this._id) );
  },
})
