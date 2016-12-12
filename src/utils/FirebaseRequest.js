import firebase from 'firebase';

export function create(nodePath, object) {
  return firebase.database().ref(nodePath)
    .push(object)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function fetch(nodePath, eventType = 'value') {
  return firebase.database().ref(nodePath)
    .once(eventType)
    .then((snapshot) => ({ data: snapshot.val() }))
    .catch((err) => ({ err }));
}

export function set(nodePath, object) {
  return firebase.database().ref(nodePath)
    .set(object)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function update(nodePath, object) {
  return firebase.database().ref(nodePath)
    .update(object)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function remove(nodePath) {
  return firebase.database().ref(nodePath)
    .remove()
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

// eventType: "value", "child_added", "child_changed", "child_removed", or "child_moved."
// return unWatchNode function
export function watchNode(nodePath, callback, eventType = 'value') {
  const ref = firebase.database().ref(nodePath);

  const handler = (snapshot) => {
    callback(snapshot.val());
  };

  ref.on(eventType, handler);

  return () => {
    ref.off(eventType, handler);
  };
}
