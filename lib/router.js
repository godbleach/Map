Router.configure({

	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('posts');
	}
});

Router.route('/', {name: 'login'});
Router.route('/map', {name: 'mapMain'});
// Router.route('/upload',{name: 'upload'});
Router.route('/historys', {name: 'postsList'})
Router.route('/signup',{name: 'signup'});
Router.route('/upload/:_id',{
	name: 'upload',
	data: function() { return Meteor.users.findOne(this.params._id);}
});


Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id);}
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/historys/:_id', {
	name: 'historyUser',
	data: function() { return Historys.findOne(this.params._id);}
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
		    this.render(this.loadingTemplate);
		}
		else {
			this.render('accessDenied');
		}
	}
	else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
