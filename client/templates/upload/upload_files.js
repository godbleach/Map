import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Sounds, Images, Videos } from '/lib/collections/files.js';
import './upload.html';

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    console.log(Images.find());
    console.log(Sounds.find());
    return Images.find() ;
  }
});
