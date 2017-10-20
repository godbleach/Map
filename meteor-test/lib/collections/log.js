Logs = new Mongo.Collection('logs');
Logs.allow({
	update: function(userId, post) { return ownsDocument(userId, post); },
	remove: function(userId, post) { return ownsDocument(userId, post); },
});
