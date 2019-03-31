import firebase from 'react-native-firebase'

import { Platform, AppState, Alert } from 'react-native'

export default class firestoreAPI {
    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    static addUser(user) {
        if (user.id) {
            return firebase.firestore().collection('users').doc(user.id).set(user)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("need to pass an object with existing id property");
        }
    }

       /**
     * Returns a promise with resolved user object
     * calling example... getUserSkills(userId).then(user => {do your staff with user object});
     * */
    static getUser(userId) {
        if (userId) {
            const ref = firebase.firestore().collection('users').doc(userId);

            return ref.get().then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.error("No such user!");
                }
            })
                .catch(function (error) {
                    console.error("Error getting user:", error);
                });
        }
    }

    static addEvent(userId, event) {
        if (userId) {
            return firebase.firestore().collection('users').doc(userId).collection('events').add(event)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("event error");
        }
    }

    static getEvents(userId) {
        
        if (userId) {
            let doc_list = [];
            return firebase.firestore().collection('users').doc(userId).collection('events').get()
            .then((querySnapshot) => {
                doc_list = querySnapshot.docs.map(doc => doc.data());
                return doc_list
            })
            .catch(error => {
                console.error("Error getting document: ", error);
            })
        }
        else{
            console.log("No user found!");
        }

    }


}
/*
export const uploadImagetoFirestore = (uri, userName) => {

    return new Promise((resolve, reject) => {
        let imgUri = uri.uri;
        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const sessionID = new Date().getTime
        const imageName = 'Profile Picture'
    })

}
*/
// User Functions 



// sign Up to Firebase
export const signUpToFirebase = (email, password) =>
    new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve('User signup'))
            .catch(error => {
                reject(error.toString())
            })
    })

// login to firebase
export const loginToFirebase = async (email, password) =>
new Promise((resolve, reject) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(resolve())
        .catch(error => {
            reject(error)
        })
})


//create firestore doc based on username 

export const createUserDocinFirestore = (username, userUID, userEmail) => 
    new Promise ((resolve, reject) => {
        const ref = firebase.firestore().collection('users')

        const verifyEmail = ref.where('Email', '==', userEmail).get()
            .then(results => {
                if (!results.empty) {
                    reject('this email is already has an account')
                }
                else {
                    const verifyName = ref.doc(username).get()
                    .then(doc => {
                        if (!doc.exists) {
                            ref.doc(username).set({
                                Username: username,
                                Email: userEmail,
                                UID: userUID,
                                photoURL: null,
                                photoName:null,
                            })

                                .then(resolve())
                                .catch((error) => {
                                    reject(error)
                                })
                        }
                        else {
                            reject("Username is already taken")
                        }
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
            })
            .catch(error => reject(error))
              // check if user name is available
})

// get User informations from currently signed in user
export const getUserData = async () =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userUid = user.uid
                userEmail = user.email
                userName = user.displayName
                userInformations = { userUid, userEmail, userName }
                resolve(userInformations)
            } else {
                reject('No user currently signed in')
            }
        })
    })

// set displayName name to the current user profile
export const setDisplayNameToFirebaseAccount = (userName) =>
new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser
    if (user) {
        user.updateProfile({
            displayName: userName
        })
            .then(resolve())
            .catch((error) => {
                reject(error)
            })
    } else {
        reject('No user currently signed in')
    }
})

export const createFireStoreDoc = async (username) => {
    const { userUID, userEmail, userName } = await getUserData();
    const setDisplayName = await setDiplayNameToFirebaseAccount(username);
    const createUser = await createFireStoreDoc(username, userUID, userEmail);
}


export const fetchDataforLogin = async () => {
    const {userUID, userEmail, userName} = await getUserData();
    return ({userEmail, userName})
}