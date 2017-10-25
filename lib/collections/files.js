import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  debug: true,
  collectionName: 'Images',
  onBeforeUpload() {
    // Disallow uploads from client
    return true;
  }
});

const Sounds = new FilesCollection({
  debug: true,
  collectionName: 'Sounds',
  onBeforeUpload() {
    // Disallow uploads from client
    return true;
  }
});

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

Meteor.methods({
  fileUpload: function(file){
    console.log("here");
    console.log(file);
    if( isImage(file.name) ){
      var uploadInstance = Images.insert({
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);
    }
    else if ( isAudio(file.name) ) {
      var uploadInstance = Sounds.insert({
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic'
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
});

// To have sample files in DB we will upload them on server startup:
if (Meteor.isServer) {
  Images.denyClient();
  Sounds.denyClient();

  Meteor.startup(() => {
    // if (!Images.findOne()) {
    //   Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
    //     fileName: 'logo.png'
    //   });
    // }
    //
    // if (!Sounds.findOne()) {
    //   Sounds.load('http://www.openmusicarchive.org/audio/Deep_Blue_Sea_Blues.mp3', {
    //     fileName: 'Deep_Blue_Sea_Blues.mp3'
    //   });
    // }
  });

  Meteor.publish('files.images.all', () => Images.find().cursor);
  Meteor.publish('files.sounds.all', () => Sounds.find().cursor);
} else {
  Meteor.subscribe('files.images.all');
  Meteor.subscribe('files.sounds.all');
}

export { Sounds, Images };
