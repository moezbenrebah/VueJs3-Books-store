import { ref } from "vue";
import { db } from "../firebase/firebaseConfig";

const useCollection = (collection) => {
  // reset the error value at the start of every request
  const error = ref(null);

  // add a new document
  const addDoc = async (doc) => {
    error.value = null;
    try {
      const response = await db.collection(collection).add(doc);
      return response;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
    }
  };

  return { error, addDoc };
};

export default useCollection;
