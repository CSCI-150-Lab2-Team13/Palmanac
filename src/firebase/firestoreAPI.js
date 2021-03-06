
import firebase from 'react-native-firebase'
import { Platform, AppState, Alert } from 'react-native'
import _ from 'lodash';
var ImagePicker = require('react-native-image-picker');

const config = {
    apiKey: "AIzaSyCbC-n--mjbOUSWOoTbjyxQcthtV7m5xhQ",
    authDomain: "scheduleapp-boof.firebaseapp.com",
    databaseURL: "https://scheduleapp-boof.firebaseio.com",
    projectId: "scheduleapp-boof",
    storageBucket: "scheduleapp-boof.appspot.com",
    messagingSenderId: "481998559301"
  };

  const firebaseService = firebase.initializeApp(config);



export default class firestoreAPI {
    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    constructor(props){
        this.getFollowingEvents = this.getFollowingEvents.bind(this)
        //this.getEventFromFollowList = this.getEventFromFollowList.bind(this)
    }
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
     * calling example... getuserskills(userId).then(user => {do your staff with user object});
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

    static addEvent(username, event) {
        if (username) {
            return firebase.firestore().collection('users').doc(username).collection('events').add(event)
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

    static addMessage(username, msg) {
        if (username) {
            return firebase.firestore().collection('users').doc(username).collection('messages').add(msg)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("message error");
        }
    }

    static addMessagedUser(username, user) {
        if (username) {
            return firebase.firestore().collection('users').doc(username).collection('messagedUsers').add(user)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("message error");
        }
    }


    static getMessagedUsers(username) {
        
        if (username) {
            let doc_list = [];
            return firebase.firestore().collection('users').doc(username).collection('messagedUsers').get()
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

    static getMessages(username) {
        
        if (username) {
            let doc_list = [];
            return firebase.firestore().collection('users').doc(username).collection('messages').get()
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

    static getEvents(username) {
        
        if (username) {
            let doc_list = [];
            return firebase.firestore().collection('users').doc(username).collection('events').get()
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

    static updateEvent(username, event, id) {
       
        if (username) {
            return firebase.firestore().collection('users').doc(username).collection('events').where("id", "==", id).get()
                .then((querySnapshot) => {
                    //should return single document
                    
                    var docRef = querySnapshot.docs[0].ref
                   
                    docRef.set(event).then( () => {
                        
                    })
                    .catch( (err) =>{
                        
                        console.error("Could not update: ", err)
                    })
                })
                .catch(error => {
                    console.error("Error updating document: ", error);
                });
        } else {
            console.error("event error");
        }

    }

    static getEventById(username, id) {
        
        if (username) {
            let doc_list = [];
            return firebase.firestore().collection('users').doc(username).collection('events').where("id", "==", id)
            .get()
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

    static getFollowingEvents(username) {
        
        if (username) {
            let doc_list = [];
            
            return firebase.firestore().collection('users').doc(username).collection('following').get()
            .then((querySnapshot) => {
                // get data from docs
                doc_list = querySnapshot.docs.map(doc => doc.data());
                return doc_list
            })
            .then((followList) => {
                var promises = followList.map( (following) => {
                    return this.getEvents(following['Username'])
                    .then( (eventList) =>{
                        return eventList.map((event) => {
                            _.set(event,'username',following['Username'])
                            _.set(event,'photoURL',following['photoURL'])
                            return event
                        })
                        //console.warn('Here')
                        // NOTE: RETURNS LIST OF LISTS
                        
                    })
                    .catch((error) => {
                        console.error("Couldn't get friends list", error)
                    })
                })
                return Promise.all(promises).then((results) =>{
                   // console.warn(JSON.stringify(results))

                    return results
                })
                .catch((err) => {
                    console.error('Could not get results', err)
                })
                
            })
            .catch(error => {
                console.error("Error getting friends events", error);
            })
        }
        else{
            console.warn("No user found!");
        }


    }
    
}
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
                                firstName: null,
                                lastName: null,
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



export const sendFirstandLastName = async (currentUser, firstName, lastName) =>{
    if (currentUser){
        return firebase.firestore().collection('users').doc(currentUser)
        .update({
            firstName:firstName,
            lastName:lastName,
        })
        .then( () => {
            console.log("Document successfully written!");
        })
        .catch((error)=> {
            console.error("Error writing document: ", error);
        })

    }
    else {
        console.error("event error");
    }
}

// get User informations from currently signed in user
export const getUserData = async () =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userUID = user.uid
                userEmail = user.email
                userName = user.displayName
                userInformations = { userUID, userEmail, userName }
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
    const setDisplayName = await setDisplayNameToFirebaseAccount(username);
    const createUser = await createUserDocinFirestore(username, userUID, userEmail);
}


export const fetchDataforLogin = async () => {
    const {userUID, userEmail, userName} = await getUserData();
    return ({userEmail, userName})
}


//-------------------
// Functions for uploading an image
//--------------------
//:-)


// set download link to firebase profile 

export const setDownloadLinktoFirebase = (link) => 
    new Promise((resolve,reject) => {
        const user = firebase.auth().currentUser
        if (user)
        {
            user.updateProfile({
                photoURL: link
            })
                .then(resolve())
                .catch((error) => {
                    reject(error)
                })
        }
        else
        {
            reject('No user is signed in')
        }
})

// add profile picture download link to cloud firestore
export const setDownloadLinktoFirestore = (downloadURL, username, imageName) => {
    return firebase.firestore().collection('users').doc(username)
            .update({
                photoURL:downloadURL,
                photoName:imageName
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error)=> {
                console.error("Error writing document: ", error);
            })
}

//-------------------
// Functions for adding and removing friends 
//--------------------
//:-)


//function to add pals 

export const followUser = (currentUser, usertoAdd, firstName, lastName, photoURL) => 
    new Promise ((resolve, reject) => {
        const ref = firebase.firestore().collection('users').doc(currentUser).collection('following')

        ref.doc(usertoAdd).get()
                    .then(doc => {
                        if (!doc.exists) {
                            ref.doc(usertoAdd).set({
                                Username: usertoAdd,
                                firstName: firstName,
                                lastName: lastName,
                                photoURL: photoURL,
                            })

                                .then(resolve())
                                .catch((error) => {
                                    reject(error)
                                })
                        }
                        else {
                            reject("Already in your following list")
                        }
                    })
                    .catch((error)=>{
                        reject(error)
                    })
})


export const addFollowertoUser = async (paltoAdd, username, firstName, lastName, photoURL) => 

    // add current user to in the new contact contactList
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('users').doc(paltoAdd).collection('followers')

        ref.doc(username).get()
            .then(doc =>{
                if (!doc.exists) {
                    ref.doc(username).set({
                        Username: username,
                        firstName: firstName,
                        lastName: lastName,
                        photoURL: photoURL,
                    })

                        .then(resolve())
                        .catch((error) => {
                            reject(error)
                        })
                }
                else {
                    reject("Already Following ")
                }
            })
            .catch((error)=>{
                reject(error)
            })
        })
//function to unfollow users 
export const unfollowUser = async (currentUser, palName) => {
    new Promise(async (resolve, reject) => {
      const ref = firebase.firestore().collection('users').doc(currentUser).collection('following')

      ref.doc(palName).get()
        .then(doc =>{
            if(doc.exists)
            {
                ref.doc(palName).delete()
                .then(resolve())
                .catch((error) => {
                    reject(error)
                })
            }
            else {
                reject("you dont follow this user")
            }
        })
        .catch((error)=>{
            reject(error)
        })
})
}



export const removeFollowerfromUser = async (palName, currentUser) => {
    new Promise(async (resolve,reject)=> {
        const ref = firebase.firestore().collection('users').doc(palName).collection('followers')

        ref.doc(currentUser).get()
        .then(doc => {
            if(doc.exists)
            {
                ref.doc(currentUser).delete()
                .then(resolve())
                .catch((error)=>{
                    reject(error)
                })
            }
            else{
                reject("already following")
            }
        })
        .catch((error)=>{
            reject(error)
        })
    })
}


/**
 * Search pals in the people screen 
 * If search == a username in the firebase firestore database return search
 * else return the next contacts name starting with the string(search)
 * 
 * 
 */
  
export const checkFriendList = async (currentUser, palName)=>
{   

    const ref = firebase.firestore().collection('users').doc(currentUser).collection('following')
    let results = []
    await ref
        .where('Username', '==',palName )
        .get()
        .then(querySnapshot =>{
            if (querySnapshot.empty)
            {
                return 
            }
            else 
            {
                // if successful, return search
                results = [{ id: 0, name: palName }]
                return 
            }
        })
            .catch((err) => {
                return 'an error has occurred while searching for pals: ', err
            })
        return results
}
export const searchPals = async (search) => {
    const ref = firebase.firestore().collection('users')
    let results = []
    // Query for exact match bewteen 'search' and a username
    await ref
        .where('Username', '==', search)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return 
            } else {
                // if successful, return search
                results = [{ id: 0, name: search }]
                return
            }
        })
        .catch((err) => {
            return 'an error has occurred while searching for pals: ', err
        })
        

    // If previous query successful, return results, end the function
    if (results.length != 0) {
        return results
    } else if (search.length > 2) {
        // if search length > 2 chars (avoid query for one, two or three letters), 
        // Query for contact's names starting with the search
        await ref
            .orderBy('Username')
            .startAfter(search)
            .limit(10)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const name = doc.get('Username')
                    const picture = doc.get('photoURL')
                    const firstName = doc.get('firstName')
                    const lastName = doc.get('lastName')
                    if (name.charAt(0) === search.charAt(0)) {
                        const newId = results.length + 1
                        const newPotentialContact = { id: newId, name: name, picture:picture, firstName:firstName, lastName:lastName }
                        results = [...results, newPotentialContact]
                    }
                    return
                })
            })
            .catch(err => {
                return 'an error has occurred while searching for pals: ', err
            })
        return results
    }
}

export const sendNotification = async (currentUser, pal,  photoURL, eventType) =>

    new Promise((resolve,reject)=> {
        const ref = firebase.firestore().collection('users').doc(pal).collection('notifications')

        ref.get()
            .then(doc => {
                if(!doc.exists)
                {
                    ref.doc().set({
                        Username: currentUser,
                        photoURL: photoURL,
                        eventType:eventType
                    })
                    .then(resolve())
                    .catch((error) => {
                        reject(error)
                    })
                }
            })
            .catch((error)=>{
                reject(error)
            })
    })



export const addEventFromFeed = async (currentUser, title, location, id, startTime , endTime, desc) =>
    new Promise ((resolve,reject)=> {
        const ref = firebase.firestore().collection('users').doc(currentUser).collection('events')
        ref
        .where('id', '==', id)
        .get()
        .then(doc => {
            if (!doc.exists) 
            {
                ref.doc().set({
                    title: title,
                    location: location,
                    id: id,
                    startTime:startTime,
                    endTime:endTime,
                    desc:desc,
                    likes: 0, 
                
                })
                .then(resolve())
                .catch((error)=> {
                    reject(error)
                })
            }
            else {
                reject("You already added this event")
            }
        })
        .catch((error)=>{
            reject(error)
        })
})

