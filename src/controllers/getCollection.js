import { ref, watchEffect } from "vue";
import { db } from "../firebase/firebaseConfig";

const getCollection = (collection) => {
  const documents = ref(null);
  // reset the error value at the start of every request
  const error = ref(null);

  // onSnapshot is a way to set up real time listener to firestore database
  // Each time we have changes in that database collection (document added or changed)
  // it sends back a snap, and fires a callback function when that's happens and access to that snapshot.
  let collectionRef = db.collection(collection).orderBy("createdAt");
  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        // to use the timestamp from the server not from the local timestamp created in the browser
        // So this pair of condition force the code to get the timestamp has been registered in the server
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch data";
    }
  );
  // This will track the change of the collection in order to avoid a re-render
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
