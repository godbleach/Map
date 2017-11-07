Template.header.rendered = function(){
		// this.$('.ui.button')
	  // .popup({
	  //   popup : $('.ui.popup'),
	  //   on    : 'click'
	  // });

		this.$('#popup')
	  .popup({
	    popup : $('.ui.popup')
	  });

}


Template.header.helpers({
	isCurrentPage: function(pageName){
        return Router.current().route.getName() === pageName ? 'active' : ''
	},

	admin: function() {
		var name = Meteor.user().username;
		return name;
	}

});

Template.header.events({
	"click .logout": function(event){
		Meteor.logout(function(err){
			if(err) {
				Bert.alert(err.reason, "danger", "growl-top-right");
			} else {
				Router.go('/');
				Bert.alert("you Are Now Logged Out", "success", "growl-top-right");
			}
		});
	},

	"click #submit": function(){
		console.log(Meteor.userId());
		let post = {
			userId: Meteor.userId(),
			userName : "peerapon",
      stuId : "5830300729",
      firstName : "peerapon",
      lastName : "Purple",
      bloodType : "ABO",
      faculty : "ENG",
      major : "COM",
      emerCell : "123456"
		};
		Meteor.call('postInsert', post);
	},

});
