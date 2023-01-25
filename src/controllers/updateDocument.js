import { db } from "@/firebase/firebaseConfig";
import { ref } from "vue";

const updatingDoc = (collection, id) => {
  const isPending = ref(false);
  const error = ref(null);

  let documentRef = db.collection(collection).doc(id);

  const handleUpdateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;
    try {
      const response = await documentRef.update(updates);
      isPending.value = false;
      console.log("update was successfully!", response);
    } catch (err) {
      err.value = err.message;
      console.log(err.value);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, isPending, handleUpdateDoc };
};

export default updatingDoc;
