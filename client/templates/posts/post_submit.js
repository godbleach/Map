Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({

  'submit form': function(e) {
    e.preventDefault();

    var post = {
      // url: $(e.target).find('[name=url]').val(),
      // title: $(e.target).find('[name=title]').val(),
      uerId : this._id,
      userName : $(e.target).find('[name=userName]').val(),
      stuId : $(e.target).find('[name=userName]').val(),
      firstName : $(e.target).find('[name=firstName]').val(),
      lastName : $(e.target).find('[name=lastName]').val(),
      bloodType : $(e.target).find('[name=bloodType]').val(),
      faculty : $(e.target).find('[name=faculty]').val(),
      major : $(e.target).find('[name=major]').val(),
      emerCell : $(e.target).find('[name=emerCell]').val()

    };

    var errors = validatePost(post);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function(error, result) {

    // display the error to the user and abort
    if (error)
      return throwError(error.reason);
    	// return alert(error.reason);

	// show this result but route anyway
	if (result.postExists)
    throwError('This link has already been posted');
		// alert('This link has already been posted');

    // Router.go('postPage', {_id: result._id});
	});

	Router.go('/map');

  }
});
