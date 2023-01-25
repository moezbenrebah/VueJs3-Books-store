import { ref, watchEffect } from "vue";
import { db } from "../firebase/firebaseConfig";

const getDocument = (collection, id) => {
  const document = ref(null);
  // reset the error value at the start of every request
  const error = ref(null);

  // onSnapshot is a way to set up real time listener to firestore database
  // Each time we have changes in that database collection (document added or changed)
  // it sends back a snap, and fires a callback function when that's happens and access to that snapshot.
  let documentRef = db.collection(collection).doc(id);
  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      }
      error.value = "No such document";
    },
    (err) => {
      console.log(err.message);
      error.value = "something went wrong";
    }
  );
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
