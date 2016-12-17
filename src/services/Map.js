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

export function watchMapUsers(callback) {
  return watchNode('/users', callback);
}
