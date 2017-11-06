Template.historyUser.helpers({
    history: function() {
      console.log( Historys.find().fetch())
      let url = Router.current().url;
      let path = url.split( '/' );
      return Historys.find({userId:path[2] });
    }

});
