import { Template } from 'meteor/templating';
import { Sounds, Images } from '/lib/files.collections.js';
import './file.html';

Template.file.helpers({
  imageFile() {
    return Images.find({}, {sort: {submitted: -1}});
  },
  audioFile() {
    return Sounds.find({}, {sort: {submitted: -1}});
  }
});
