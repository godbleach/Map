import { Sounds, Images } from '/lib/collections/files.js';
import './post_item.html';

Template.postItem.helpers({

  imageFile: function() {
    console.log(this.userId);
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
