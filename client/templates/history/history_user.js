import { Historys } from '/lib/collections/historys.js';

var handle = Meteor.subscribe('historys');

Template.historyUser.helpers({

    history: function() {
        let url = Router.current().url;
        let path = url.split( '/' );

        console.log(path[2]);
        if ( handle.ready() ) {
            let obj = Historys.find({"userId" : path[2] }).fetch();
            console.log(obj[0].address);
            return Historys.find({"userId" : path[2] });
          }
   
    }
  
});