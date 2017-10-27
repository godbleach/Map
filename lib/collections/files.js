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

const Videos = new FilesCollection({
  debug: true,
  collectionName: 'Videos',
  onBeforeUpload() {
    // Disallow uploads from client
    return true;
  }
});


// To have sample files in DB we will upload them on server startup:
if (Meteor.isServer) {
  Images.denyClient();
  Sounds.denyClient();
  Videos.denyClient();

  Meteor.publish('files.images.all', () => Images.find().cursor);
  Meteor.publish('files.sounds.all', () => Sounds.find().cursor);
  Meteor.publish('files.videos.all', () => Videos.find().cursor);
} else {
  Meteor.subscribe('files.images.all');
  Meteor.subscribe('files.sounds.all');
  Meteor.subscribe('files.videos.all');
}

export { Sounds, Images, Videos };
