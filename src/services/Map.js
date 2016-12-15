import firebase from 'firebase';
import moment from 'moment';
import { update } from '../utils/FirebaseRequest';

export function updateUserLocation({ latitude, longitude }) {
  const { currentUser } = firebase.auth();
  const lastLocationTime = moment().unix();

  return update(`/users/${currentUser.uid}`, {
    latitude,
    longitude,
    lastLocationTime
  });
}
