import { Files } from '/lib/collections/files.js';
import './post_page.html';


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
