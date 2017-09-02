Template.addUser.rendered = function() {

}

Template.addUser.events({
	"submit .add-info": function() {
		var userName = event.target.userName.value;
		var bloodType = event.target.bloodType.value;
		var faculty = event.target.faculty.value;
		var major = event.target.major.value;
		var emerCell = event.target.emerCell.value;

		if (isNotEmpty(userName) &&
			isNotEmpty(bloodType) &&
			isNotEmpty(faculty) &&
			isNotEmpty(major) &&
			isNotEmpty(emerCell) ){

			Meteor.call('addJokes', userName , bloodType , faculty , major , emerCell);

			event.target.userName.value = "";
			event.target.bloodType.value = "";
			event.target.faculty.value = "";
			event.target.major.value = "";
			event.target.emerCell.value = "";

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