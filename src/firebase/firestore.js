
import firebase from 'react-native-firebase'


import { initFirestorter, Collection, Document } from 'firestorter';




initFirestorter({firebase});



export const db = firebase.firestore();

export const users = new Collection('users');

export const auth = firebase.auth();
// User Functions 



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



export const followPalOnFirestore = async (currentUser, paltoAdd) => {

    new Promise ((resolve, reject) => {
        const ref = firebase.firestore().collection('users').doc(currentUser).collection('following')

        const verifyEmail = ref.where('Username', '==', paltoAdd).get()
            .then(results => {
                if (!results.empty) {
                    reject('already following')
                }
                else {

                    const verifyName = ref.doc(paltoAdd).get()
                    .then(doc => {
                        if (!doc.exists) {
                            ref.doc(paltoAdd).set({
                                Username: null,
                                firstName: null,
                                lastName: null,
                                Email: null,
                                UID: null,
                                photoURL: null,
                                photoName:null,
                            })

                                .then(resolve())
                                .catch((error) => {
                                    reject(error)
                                })
                        }
                        else {
                            reject("already following")
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
}

//function to delete friends 
export const deleteFriend = async (currentUser, palName) => {
    new Promise(async (resolve, reject) => {
        await firebase
            .firestore()
            .collection('users')
            .doc(currentUser)
            .collection('pals')
            .where('username', '==', palName)
            .get()
            .then(docs => {
                firebase.firestore().doc(docs.docs[0].ref._documentPath._parts.join('/').toString()).set({
                    delete: true
                }, { merge: true })
            })
            .catch(err => reject(err))
        if (currentUser !== palName) {
            await firebase
                .firestore()
                .collection('users')
                .doc(contactName)
                .collection('pals')
                .where('username', '==', currentUser)
                .get()
                .then(docs => {
                    firebase.firestore().doc(docs.docs[0].ref._documentPath._parts.join('/').toString()).set({
                        delete: true
                    }, { merge: true })

                })
                .catch(err => reject(err))
        }
        resolve()
    })
}


/**
 * Search pals in the people screen 
 * If search == a username in the firebase firestore database return search
 * else return the next contacts name starting with the string(search)
 * 
 * 
 */
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
                    if (name.charAt(0) === search.charAt(0)) {
                        const newId = results.length + 1
                        const newPotentialContact = { id: newId, name: name }
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


export const fetchUserFollowing = async (username) => {
     const ref = firebase.firestore().collection('users').doc(username)
     let results = []

     ref
        .get()
        .then( doc => {
            let data = doc.data()
            results = data
        })
        .catch((err) => {
            return 'an error has occurred  ', err
        })
}

