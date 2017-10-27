import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Sounds, Images, Videos } from '/lib/collections/files.js';
import './upload.html';

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
};

function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
  case 'jpg':
  case 'gif':
  case 'bmp':
  case 'png':
      //etc
      return true;
  }
  return false;
};

function isAudio(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
  case 'mp3':
      //etc
      return true;
  }
  return false;
};

function isVideo(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
  case 'mp4':
      //etc
      return true;
  }
  return false;
};

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    // console.log('here');
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        console.log("here");
        console.log(file);
        console.log(this);
        // Meteor.call('fileUpload',e);
        if( isImage(file.name) ){
          var uploadInstance = Images.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic',
          }, false);
        }
        else if ( isAudio(file.name) ) {
          var uploadInstance = Sounds.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic',
          }, false);
        }
        else if ( isVideo(file.name) ) {
          var uploadInstance = Videos.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic',
          }, false);
        }


        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            window.alert('Error during upload: ' + error.reason);
          } else {
            window.alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
  },


});

// Meteor.methods({
//   getExtension: function(filename) {
//     var parts = filename.split('.');
//     return parts[parts.length - 1];
//   },
//
//   isImage: function (filename) {
//     var ext = getExtension(filename);
//     switch (ext.toLowerCase()) {
//     case 'jpg':
//     case 'gif':
//     case 'bmp':
//     case 'png':
//         //etc
//         return true;
//     }
//     return false;
//   }
// });
