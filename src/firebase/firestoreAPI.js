import {firestore} from "firebase";
export default class firestoreAPI {
    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    static addUser(user) {
        if (user.id) {
            return firestore().collection('users').doc(user.id).set(user)
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
            const ref = firestore().collection('users').doc(userId);

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

    static addUser(user) {
        if (user.id) {
            return firestore().collection('users').doc(user.id).set(user)
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

    static addEvent(userId, event) {
        if (userId) {
            return firestore().collection('users').doc(userId).collection('events').add(event)
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
            var doc_list = []
            firestore().collection('users').doc(userId).collection('events').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                     doc_list.push( doc.data() );
                });
            });
            return doc_list
        }
        else{
            console.log("No user found!");
        }
    }


}


