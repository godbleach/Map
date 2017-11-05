import { Files } from '/lib/collections/files.js';
import './post_page.html';

Template.postPage.rendered = function() {
    this.$('#carousel').slick({
      dots: true,
      arrows: true
    });
    this.$('.ui.modal').modal({ detachable: false });

  }

Template.postPage.helpers({
  audioFile: function() {
    // console.log(this.userId);
    console.log(Files.find({ "$and": [{ "userId":this.userId },{ "isAudio":true } ] } ));
    return Files.find({ "$and": [{ "userId":this.userId },{ "isAudio":true } ] } );
  },

  imageFile: function() {
    return Files.find({ "$and": [{ "userId":this.userId },{ "isImage":true } ] } );
  },

  videoFile: function() {
    return Files.find({ "$and": [{ "userId":this.userId },{ "isVideo":true } ] } );
  },

});

Template.postPage.events({
    // 'click .openModal': function (e,template) {
    //   console.log('modal');
    //   template.$('.ui.modal').modal('show');
    // },

    'click .link.card#showImage': function (e,template) {
      console.log('modal');
      template.$('.ui.modal').modal("refresh").modal('show');
    },
  });
