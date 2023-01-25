import { ref } from "vue";
import { db } from "../firebase/firebaseConfig";

const isLoading = ref(false);

const useCollection = (collection) => {
  isLoading.value = true;
  // reset the error value at the start of every request
  const error = ref(null);

  // add a new document
  const addDoc = async (doc) => {
    error.value = null;
    try {
      const response = await db.collection(collection).add(doc);
      isLoading.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isLoading.value = false;
    }
  };

  return { error, addDoc, isLoading };
};

export default useCollection;
