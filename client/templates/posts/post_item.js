import { Files } from '/lib/collections/files.js';
import './post_item.html';

var handle = Meteor.subscribe('historys');

Template.postItem.rendered = function(){
    this.$('.ui.accordion').accordion();
    this.$('.ui.dropdown').dropdown();
    this.$('.ui.checkbox').checkbox({uncheckable: false});
}

Template.postItem.helpers({

  isCurrentPage: function(pageName){
        return Router.current().route.getName() === pageName ? 'active' : ''
  },

  nearby: function(){
    // console.log(this._id);
    return this._id;
  },

  trackAccordion: function(){
    this.$('.ui.accordion').accordion();
  },

  ownPost: function() {
  	return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  checked: function(){
    // console.log(Historys.find().fetch());
    // var h = Historys.findOne({userId: this.userId});
    // var markid = h.markId;
    // console.log(markid);
    if(Historys.findOne({userId: this.userId})){
      var h = Markers.findOne({userId: this.userId});
      var markid = h._id;
      console.log(markid);
      console.log(Historys.findOne({ "$and": [{ userId :this.userId },{ markId :markid } ] }))
      if(Historys.findOne({ "$and": [{ userId :this.userId },{ markId :markid } ] })){
        return true;
      }
    }
    return false;
  },
});

Template.postItem.events({
  'click .button#remove': function(e){
    e.preventDefault();
     var markId = Markers.findOne({userId: this.userId});
     var user = Posts.findOne({userId: this.userId});
     var user_id = user.username;
     Session.set('lat',markId.lat);
     Session.set('lng',markId.lng);
    // console.log(markId);
    Markers.remove(markId._id);

    var allFiles = Files.find({userId: this.userId}).fetch();
    console.log(allFiles);
    for(let i=0; i<allFiles.length;i++){
      Meteor.call('fileRemove',allFiles[i]._id);
    }
  },

  'click .button#info': function(e){
    Router.go("/posts/"+this._id);
  },

  'click .header#setCenter': function(e){
    let markId = Markers.findOne({userId: this.userId});
    Session.set('nearby',this._id);
    Session.set('lat',markId.lat);
    Session.set('lng',markId.lng);
  },

  // 'click #dropNearby': function(e){
  //   console.log('find Hospital');
  //   if(Session.get('nearOn'+this._id)){
  //     return;
  //   }
  //   let markId = Markers.findOne({userId: this.userId});
  //   Session.set('nearby',this._id);
  //   Session.set('nearLatLng', {lat:markId.lat, lng:markId.lng});
  //   // console.log(  Session.get('check'+ this._id) );
  //   Session.set('nearOn'+this._id,true);
  // },

  'click #check': function(e){
    // console.log( 'check'+ this._id);
    // console.log( 'check'+ Meteor.user().username);
    // console.log(Historys.findOne({ "$and": [{ "userId" :this.userId },{ "_id" :this._id } ] }))
    // console.log(Historys.findOne({userId: this.userId},{_id:this._id}));
    // console.log(this.markId);
    // var h = Historys.findOne({userId: this.userId});
    // var markid = h.markId;
    // console.log(Historys.findOne({userId: this.userId},{markId: markid}));
    if(Historys.findOne({userId: this.userId})){
      var h = Markers.findOne({userId: this.userId});
      var markid = h._id;
      if(Historys.findOne({ "$and": [{ userId :this.userId },{ markId :markid } ] })){
        return;
      }
        
    }
    var markId = Markers.findOne({userId: this.userId});
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var date = (month + "/" + day + "/" + year).toString();
    var d = new Date();
    var time = d.toLocaleTimeString();
    // console.log(markId._id);

    let info = {
      userId : this.userId,
      markId : markId._id,
      address : markId.address,
      admin : Meteor.user().username,
      date : date,
      time : time
    };

    Meteor.call('logInsert',info);
  },


})
