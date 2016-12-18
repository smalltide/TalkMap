import firebase from 'firebase';
import moment from 'moment';
import { create, watchNode } from '../utils/FirebaseRequest';

export function updateChatMessage({ owner, users, message }) {
  const { currentUser } = firebase.auth();
  const user = users[currentUser.uid];

  const { uid, email, displayName, photoURL } = user;
  const lastMessageTime = moment().unix();

  return create(`/chats/${owner.uid}`, {
    uid,
    email,
    displayName,
    photoURL,
    message,
    lastMessageTime
  });
}

export function watchChatMessage(owner, callback) {
  return watchNode(`/chats/${owner.uid}`, callback);
}
