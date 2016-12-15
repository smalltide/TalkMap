import _ from 'lodash';
import firebase from 'firebase';
import { update } from '../utils/FirebaseRequest';

export function signInWithEmailAndPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => ({ user }))
    .catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return { user, isCreate: true };
        })
        .catch((err) => ({ err }));
    });
}

export function signOut() {
  return firebase.auth().signOut();
}

export function initDBUser(user) {
  const { uid, email } = user;
  const displayName = _.capitalize(user.email.split('@')[0]);

  return update(`/users/${uid}`, {
    uid,
    email,
    displayName,
    photoURL: '',
    latitude: '',
    longitude: '',
    lastLocationTime: '',
    message: '',
    lastMessageTime: ''
  });
}
