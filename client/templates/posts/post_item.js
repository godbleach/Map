import { Sounds, Images } from '/lib/collections/files.js';
import './post_item.html';

Template.postItem.rendered = function(){
    this.$('.ui.accordion').accordion();
}

Template.postItem.helpers({
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
    Router.go("/posts/"+this._id);
  },

  'click .header#setCenter': function(e){
    var markId = Markers.findOne({userId: this.userId});
    Session.set('nearby',this._id);
    Session.set('lat',markId.lat);
    Session.set('lng',markId.lng);
  },
})
