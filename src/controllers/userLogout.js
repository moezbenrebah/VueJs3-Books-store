import { ref } from "vue";
import { authDB } from "../firebase/firebaseConfig";

const isLoading = ref(false);
const error = ref(null);

const userLogout = () => {
  const logout = async () => {
    isLoading.value = true;
    // reset the error value at the start of every request
    error.value = null;
    try {
      await authDB.signOut();
      isLoading.value = false;
    } catch (err) {
      console.log(err.message);
      isLoading.value = false;
      error.value = err.message;
    }
  };
  return { logout, error, isLoading };
};

export default userLogout;
