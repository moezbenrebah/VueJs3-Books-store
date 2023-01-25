import { ref } from "vue";
import { db } from "../firebase/firebaseConfig";

const deleteDocument = (collection, id) => {
  const isDeleting = ref(false);
  // reset the error value at the start of every request
  const error = ref(null);

  // Reference to the current document
  const documentRef = db.collection(collection).doc(id);

  // delete document
  const removeDoc = async () => {
    isDeleting.value = true;
    error.value = null;
    try {
      const response = await documentRef.delete();
      isDeleting.value = false;
      console.log("document deleted");
      return response;
    } catch (err) {
      console.log(err.message);
      error.value = "could not delete document";
      isDeleting.value = false;
    }
  };

  return { error, removeDoc, isDeleting };
};

export default deleteDocument;
