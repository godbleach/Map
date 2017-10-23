import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Images from '/lib/images.collection.js';
import './upload.html';

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});
