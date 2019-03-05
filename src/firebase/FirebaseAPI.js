import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const createUser = (email, password) => {
	console.log('CreateUser has been called.')

  firebase.auth().createUserWithEmailAndPassword(
		email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// add more errorcodes to customize messages 
				if (errorCode == 'auth/weak-password') {
					alert('The password is too weak.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
}
export const signInUser = (email , password) => {
	console.log('signInUser has been called')
	firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
	});

}


export const logoutUser = () => {

	firebase.auth().signOut().then(function () {
		console.log('Sign-out successful.');
	}).catch(function (error) {
		console.log(error);
	});

}
