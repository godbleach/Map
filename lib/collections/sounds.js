// Sounds = new Mongo.Collection('sounds');
//
// Sounds.allow({
// 	update: function(userId, doc) { return true; },
// 	remove: function(userId, doc) { return true; },
// });
//
// Sounds.methods({
// 	soundInsert: function(soundAttibutes){
//      	var soundId = Sounds.insert({soundId:soundAttibutes.user_id, sound:soundAttibutes.sound});
//      	return {
// 		 	_id: soundId
// 		};
// 	}
//
// });
