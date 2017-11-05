Historys = new Mongo.Collection('historys');

Historys.allow({
	update: function(userId, doc) { return true; }
});

Meteor.methods({
	logInsert: function(id){

        check(id, {
			userId: String,
		});
        
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (month + "/" + day + "/" + year).toString();
        var d = new Date();
        var time = d.toLocaleTimeString();

        Historys.Insert({
            date: date,
            time: time,
            
        })

    }

});