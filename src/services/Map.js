import firebase from 'firebase';
import moment from 'moment';
import { update, watchNode } from '../utils/FirebaseRequest';

export function updateUserLocation({ latitude, longitude }) {
  const { currentUser } = firebase.auth();
  const lastLocationTime = moment().unix();

  return update(`/users/${currentUser.uid}`, {
    latitude,
    longitude,
    lastLocationTime
  });
}

export function updateUserMessage({ message }) {
  const { currentUser } = firebase.auth();
  const lastMessageTime = moment().unix();

  return update(`/users/${currentUser.uid}`, {
    message,
    lastMessageTime
  });
}

export function updateUserOnlineStatus() {
  const { currentUser } = firebase.auth();
  const nodePath = `/users/${currentUser.uid}`;

  firebase.database().ref(nodePath)
    .onDisconnect().update({ online: 0 });

  return watchNode('/.info/connected', (val) => {
    if (val === true) {
      update(nodePath, { online: 1 });
    }
  });
  //return update(nodePath, { online: 1 });
}

export function updateUserOffStatus() {
  const { currentUser } = firebase.auth();

  return update(`/users/${currentUser.uid}`, { online: 0 });
}

export function watchMapUsers(callback) {
  return watchNode('/users', callback);
}
