Historys = new Mongo.Collection('historys');

Historys.allow({
    remove: function(userId, doc) { return true; },
	update: function(userId, doc) { return true; }
});

Meteor.methods({
	logInsert: function(info){

        check(info, {
			userId : String,
            address : String,
            admin : String,
            date : String,
            time : String
		});
        
        var historyId = Historys.insert(info)
        console.log(Historys.find().fetch());        

        return {
            _id: historyId
       };
     
    }

});

if (Meteor.isServer) {
    Meteor.publish('historys.all', () => Historys.find().cursor);
  } else {
    Meteor.subscribe('historys.all');
  }

  export { Historys };