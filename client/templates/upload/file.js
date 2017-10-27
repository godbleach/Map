import { Template } from 'meteor/templating';
import { Sounds, Images, Videos } from '/lib/collections/files.js';
import './file.html';

Template.file.helpers({
  imageFile() {
    return Images.find({}, {sort: {submitted: -1}});
  },
  audioFile() {
    return Sounds.find({}, {sort: {submitted: -1}});
  }
  videoFile() {
    return Videos.find({}, {sort: {submitted: -1}});
  }
});
