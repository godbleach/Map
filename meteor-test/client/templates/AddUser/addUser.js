Template.addUser.rendered = function() {

}

Template.addUser.events({
	'submit form': function(e) {
		e.preventDefault();

		var info = {
      userName: $(e.target).find('[name=userName]').val(),
      bloodType: $(e.target).find('[name=bloodType]').val(),
			faculty: $(e.target).find('[name=faculty]').val(),
			major: $(e.target).find('[name=major]').val(),
			emerCell: $(e.target).find('[name=emerCell]').val(),
    };

		if (isNotEmpty(userName) &&
			isNotEmpty(bloodType) &&
			isNotEmpty(faculty) &&
			isNotEmpty(major) &&
			isNotEmpty(emerCell)){

			Meteor.call('addUserInfo', info);

			e.target.userName.value = "";
			e.target.bloodType.value = "";
			e.target.faculty.value = "";
			e.target.major.value = "";
			e.target.emerCell.value = "";

			Bert.alert("Your Joke Was Posted!", "success", "growl-top-right");

		} else {

			Bert.alert("something went wrong", "danger", "growl-top-right");
		}

		return false; // prevent submit
	}
});

// Validation Rules

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};
